import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IBuyCartOne } from "../../interfaces/cartInterface";
import { IAuthReducers } from "../../redux/reducers/auhReducers";
import { RootState } from "../../redux/reducers";
import { getCart } from "../../services/cart";
import cart from "../../assest/image/cart.png";

import React from 'react'
import { IonCol, IonContent, IonGrid, IonRow, IonSpinner } from "@ionic/react";

const Cart = () => {

  const navigate = useHistory();
  const [cartData, setCartData] = useState<IBuyCartOne[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);

  const authReducer: IAuthReducers = useSelector(
    (state: RootState) => state.AuthReducers
  );

  const cart_data = async () => {
    setLoading(true);
    const data = {
      user_id: authReducer.authData?.id,
    };
    const get_cart = await getCart(data);
    if (get_cart.data?.success) {
      const rsp = get_cart.data;
      let quantity = 0;
      let total_amount = 0;
      let discount = 0;
      rsp.data.forEach((item: any) => {
        quantity += item.quantity;
        total_amount += item.product_id.prize * item.quantity;
        discount += item.product_id.discount * item.quantity;
      });
      setTotalAmount(total_amount);
      setTotalDiscount(discount);
      settotalQuantity(quantity);
      setCartData(get_cart.data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    cart_data();
  }, []);

  const buyNow = (data: any) => {
    setLoading(true);
    const product_Details = {
      image: cartData[0].product_id?.image,
      amount: cartData[0].product_id?.prize,
      product_id: cartData[0].product_id?.id,
      signup_id: authReducer.authData?.id,
      product_name: cartData[0].product_id?.product_name,
      description: cartData[0].product_id?.description,
      quantity: cartData[0].quantity,
    };
    setLoading(false);
    navigate.push("/buy-now", { state: product_Details });
  };

  const placeAllOrder = async () => {
    setLoading(true);
    if (cartData.length > 1) {
      setLoading(false);
      navigate.push("/buy-now", { state: cartData });
    } else {
      const product_Details = {
        image: cartData[0].product_id?.image,
        amount: cartData[0].product_id?.prize,
        product_id: cartData[0].product_id?.id,
        signup_id: authReducer.authData?.id,
        product_name: cartData[0].product_id?.product_name,
        description: cartData[0].product_id?.description,
        quantity: cartData[0].quantity,
      };
      setLoading(false);
      navigate.push("/buy-now", { state: product_Details });
    }
  };

  return (
    <>
      <IonContent fullscreen={true} className="ion-padding">
        {loading ? (
          <>
            <div className="container-fluid">
              <div className="text-center align-center">
                <IonSpinner name="circles" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <div className="mt-4 pt-1">
                  <IonGrid className="ion-padding">
                    <h1 className="text text-center">Cart</h1>
                    <IonRow>
                      {cartData && cartData.length && 
                        <IonCol size="12" size-md="4" size-lg="6" className="ion-padding w-100">
                          <div>
                            <table className="table w-100 table table-success table-striped">
                              <tbody>
                                <tr>
                                  <td>Amount (2 Item)</td>
                                  <td>₹{totalAmount}</td>
                                </tr>

                                <tr>
                                  <td>Discount</td>
                                  <td> {totalDiscount}</td>
                                </tr>
                                <tr>
                                  <td>Txt</td>
                                  <td>₹0</td>
                                </tr>
                                <tr>
                                  <td>Shipping</td>
                                  <td className="text-success text-uppercase`">
                                    Free
                                  </td>
                                </tr>
                                <tr>
                                  <td>Total</td>
                                  <td>₹{totalAmount}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </IonCol>
                      }
                      
                      <IonCol size="12" size-md="4" size-lg="6">
                        <div className="card border-0 p-1">
                          {cartData && cartData.length > 0 ? (
                            <>
                              <div className="col-8">
                                {cartData.map((item: any, index) => {
                                  return (
                                    <>
                                      <form
                                        action=""
                                      // onSubmit={buyNow}
                                      ></form>
                                      <table className="table w-100 table-success table-striped">
                                        <thead key={index}>
                                          <tr className="">
                                            <th>
                                              Product
                                            </th>
                                            <th>Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">SubTotal</th>
                                            <th scope="col">Buy</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="">
                                            <th
                                              scope="row"
                                              className=""
                                            >
                                              <img
                                                src={item.product_id.image}
                                                alt=""
                                                className=""
                                                style={{
                                                  height: "100px",
                                                  width: "150px",
                                                }}
                                              />
                                              <span className="">
                                                {" "}
                                                {item.product_id.product_name}
                                              </span>
                                            </th>
                                            <td>₹{item.product_id.prize}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                              ₹{item.product_id.prize * item.quantity}
                                            </td>
                                            <td className="">
                                              <button
                                                type="submit"
                                                className="btn btn-primary m-auto"
                                                onClick={buyNow}
                                              >
                                                Place Order
                                              </button>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </>
                                  );
                                })}
                              </div>
                              <div className="text-center align-center">
                                <button
                                  type="submit"
                                  className="btn btn-danger text-center align-center"
                                  onClick={placeAllOrder}
                                >
                                  Place All Order
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <span className="text-center p-5 text-danger">
                                {" "}
                                <img src={cart} alt="Empty Cart" style={{ height: "300px", width: "300px" }} />
                                <br />
                                <h1>Empty Cart</h1>
                              </span>
                            </>
                          )}
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
              </div>
            </div>
          </>
        )
        }
      </IonContent>
    </>
  )
}

export default Cart