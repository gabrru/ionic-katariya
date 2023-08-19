import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from 'react-router';
import toast from '../../utils/toastsMessage';
import { IAuthReducers } from '../../redux/reducers/auhReducers';
import { RootState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { create_order } from '../../services/payment';

const PaypalCheckOut = (props: any) => {

    const style = { layout: "vertical" };
    const oldAmount = props.amount / 73;
    const amount = oldAmount.toFixed(2);
    const navigate = useHistory();
    const authReducer: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

  return (
      <>
          <PayPalButtons
              disabled={false}
              forceReRender={[props.amount, props.currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: props.currency,
                                      value: amount,
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          // Your code here after create the order
                          console.log("???????????", orderId);
                          return orderId;
                      });
              }}
              onApprove={async (data: any, actions: any) => {
                  const capture = await actions.order.capture();
                  if (capture) {
                      console.log(capture.purchase_units[0].payments.captures[0].id);
                      const setData = {
                          user_id: props.user_id,
                          total_amount: props.product?.amount,
                          translation_id: capture.purchase_units[0].payments.captures[0].id,
                          amount: props.amount,
                          product_id: props.product?.product_id,
                          address_id: props.product?.address_id,
                          status: "success",
                          quantity: props.product?.quantity,
                          order_id: data.orderID,
                          email: authReducer.authData?.email as unknown as string,
                      };
                      const bckCon = async (setData: any) => {
                          try {
                              const response = await create_order(setData);
                              console.log("response------", response.data);
                              if (response.data?.success) {
                                  toast.success("Payment is Completed !!!");
                                  navigate.push("/home");
                              } else {
                                  toast.error(response.data?.message);
                              }
                          } catch (error) {
                              console.log("Error", error);
                          }
                      };
                      bckCon(setData);
                  }
              }}
          />
      </>
  )
}

export default PaypalCheckOut