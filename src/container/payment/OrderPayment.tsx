import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from "./PaypalCheckout";
import CheckOutForm from "./StripeCheckOut"
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from '../../redux/reducers';
import { IAuthReducers } from '../../redux/reducers/auhReducers';
import { IonContent, IonSpinner } from '@ionic/react';

const OrderPayment = () => {

    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [amounts, setAmount] = useState(0);
    const [totalQuantity, settotalQuantity] = useState(0);
    const location: any = useLocation();
    const amount = location.state?.amount

    const authReducer: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const details = () => {
        if (location.state?.length >= 1) {
            const rsp = [location.state];
            let quantity = 0;
            let total_amount = 0;
            let discount = 0;
            rsp.forEach((item: any) => {
                quantity += item.quantity;
                total_amount += item.amount * item.quantity;
                discount += item.discount * item.quantity;
            });
            setTotalAmount(total_amount);
            setTotalDiscount(discount);
            settotalQuantity(quantity);
            setAmount(total_amount);
        } else {
            setTotalAmount(location.state?.amount);
            setAmount(location.state?.amount);
            settotalQuantity(location.state?.quantity);
            setTotalDiscount(location.state?.Discount);
        }
    };

    useEffect(() => {
        details();
    });
    const [product] = useState({
        name: authReducer.authData?.name,
        amount: location.state?.amount,
        user_id: authReducer.authData?.id,
        address_id: location.state?.address_id,
        email: authReducer.authData?.email,
        image: location.state?.image,
        product_id: location.state?.product_id,
        product_name: location.state?.product_name,
        quantity: location.state?.quantity
    });
    const stripePromise = loadStripe(
        "pk_test_51M6YjCG9eXFXN80RNmUy3mbDECe1ATJ2gjJenLrICYRZcCKF3hO2blX1vnmWaxVD67RVOa5GAVNiJBFUMFofo90U00rZJLYJbM"
    );

    return (
        <>
            <IonContent fullscreen={true} className="ion-padding">
                <div className="container-fluid mt-3 pt-1">
                    <h1 className="align-center text-center text-primary">
                        <u>Your Bill : {location.state?.amount} INR </u>
                    </h1>
                    <div className="row">
                        <div className="col-sm-5 col-lg-5">
                            <div
                                className="m-2 pl-5"
                                style={{ maxWidth: "500px", minHeight: "200px" }}
                            >
                                <table className="table w-100 table table-success table-striped">
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Quantity</td>
                                            <td>{totalQuantity}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Txt</td>
                                            <td>₹0</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Amount</td>
                                            <td>{amounts}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Shipping</td>
                                            <td className="text-success text-uppercase">free</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Total</td>
                                            <td>{totalAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm-5 col-lg-5 ">
                            <div className="m-2 mx-2">
                                {location.state?.length > 1 ? (
                                    <>
                                        <Elements stripe={stripePromise}>
                                            <CheckOutForm product={location.state} stripe={stripePromise} />
                                        </Elements>
                                    </>
                                ) : (
                                    <>
                                        <Elements stripe={stripePromise}>
                                            <CheckOutForm product={product} stripe={stripePromise} />
                                        </Elements>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center w-5 h-5 ">
                            <IonSpinner name="dots" />
                        </div>
                    ) : (
                        <>
                            <div className="p-1 m-1">
                                <PayPalScriptProvider
                                    options={{
                                        "clientId":
                                            "ASLEjKjY5LacU1vZqdmTe6Q7N7E2n672_ngGWLQE_bgj0n8TQR_CmTDLrci18Bfos8n3VRcnNXMwk9Na",
                                        components: "buttons",
                                    }}
                                >
                                    {location.state?.length > 1 ? (
                                        <>
                                            <Paypal
                                                currency="USD"
                                                amount={amount}
                                                user_id={authReducer.authData?.id}
                                                product={location.state}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Paypal
                                                currency="USD"
                                                amount={amount}
                                                user_id={authReducer.authData?.id}
                                                product={location.state}
                                            />
                                        </>
                                    )}
                                </PayPalScriptProvider>
                            </div>
                        </>
                    )}
                </div>
            </IonContent>
            
        </>
    )
}

export default OrderPayment