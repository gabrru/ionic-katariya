// import React from 'react'
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import toast from "../../utils/toastsMessage";
import { useHistory } from "react-router-dom";
import {
  create_all_order,
  create_order,
  create_payment,
} from "../../services/payment";
import { ICreateOrder, IPayment } from "../../interfaces/paymentInterface";
import { useSelector } from "react-redux";
import { IAuthReducers } from "../../redux/reducers/auhReducers";
import { RootState } from "../../redux/reducers";
import { IonSpinner } from "@ionic/react";

const StripeCheckOut = (props: any) => {
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();

  const [errors, setErrors] = useState({
    incomplete_number: "",
    incomplete_expiry: "",
    incomplete_cvc: "",
  });
  const elements = useElements();
  const stripe = useStripe();

  const authReducer: IAuthReducers = useSelector(
    (state: RootState) => state.AuthReducers
  );

  console.log("authReducer.authData?.email", authReducer.authData?.email);
  const name =
    props.product?.length > 1 ? props.product[0].name : props.product?.name;
  const address_id =
    props.product?.length > 1
      ? props.product[0].address
      : props.product?.address;

  const amount =
    props.product?.length > 1 ? props.product[0].amount : props.product?.amount;
  // HANDLE PAYMENT AND REDIRECT THE PAGE
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cardElement = elements && elements.getElement(CardNumberElement);
      const createPayment =
        stripe &&
        (await stripe.createPaymentMethod({
          type: "card",
          card: cardElement!,
          billing_details: {
            email: props.product?.email,
          },
        }));
      // CREATE PAYMENT AND CONFIRM PAYMENT
      const rsp: IPayment = {
        amount: amount,
        currency: "USD",
        payment_method: createPayment?.paymentMethod?.id,
        name: name,
        user_id: authReducer.authData?.id as unknown as string,
        address_id: address_id,
        email: authReducer.authData?.email as unknown as string,
      };
      const { data: clientSecret } = await create_payment(rsp);

      if (createPayment?.paymentMethod && clientSecret?.client_secret) {
        const confirmPayment =
          stripe &&
          (await stripe.confirmCardPayment(clientSecret?.client_secret as any, {
            payment_method: createPayment?.paymentMethod.id,
          }));
        if (createPayment?.paymentMethod && confirmPayment) {
          const { paymentIntent, error } = confirmPayment;

          // AFTER CREATE PAYMENT THEN  INSERT DATA IN DATABASE
          if (paymentIntent) {
            if (props.product?.length > 1) {
              const payload: any = {
                user_id: authReducer.authData?.id,
                amount,
                total_amount: amount,
                status: paymentIntent.status,
                translation_id: paymentIntent.id,
                order: props.product,
                email: authReducer.authData?.email,
              };
              const savePayment = await create_all_order(payload);
              if (savePayment?.data?.success) {
                toast.success("Order Create is successfully");
                setLoading(false);
                navigate.push("/home");
              }
            } else {
              const paymentPayload: ICreateOrder = {
                total_amount: props.product?.amount,
                amount: props.product?.amount / props.product?.quantity,
                user_id: props.product?.user_id,
                address_id: props.product?.address_id,
                product_id: props.product?.product_id,
                status: paymentIntent.status,
                translation_id: paymentIntent.id,
                quantity: props.product?.quantity,
                email: authReducer.authData?.email as unknown as string,
              };
              const savePayment = await create_order(paymentPayload);
              if (savePayment?.data?.success) {
                toast.success("Order Create is successfully");
                setLoading(false);
                navigate.push("/home");
              }
            }
          } else if (error) {
            toast.error("Order is Failed");
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.log("Error-----", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <h3 className="text-danger">Pay With Stripe</h3>
      <form>
        {/* <h1>{translation("checkout_form")}</h1> */}
        <div className="">
          <label>Card Number</label>
          <CardNumberElement className="form-control p-2" />

          <div className="auth-msg error">
            <p>{errors.incomplete_number}</p>
          </div>
        </div>
        <div className="stripe-input form-group">
          <label>Card Expiry</label>
          <CardExpiryElement className="form-control p-2" />
          <div className="auth-msg error">
            <p>{errors.incomplete_expiry}</p>
          </div>
        </div>
        <div className="stripe-input form-group">
          <label>Cvv</label>
          <CardCvcElement className="form-control p-2" />
          <div className="auth-msg error">
            <p>{errors.incomplete_cvc}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-info m-2"
            style={{ width: "120px" }}
          >
            <span> {loading ? <IonSpinner name="dots" /> : " Payment"}</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default StripeCheckOut;
