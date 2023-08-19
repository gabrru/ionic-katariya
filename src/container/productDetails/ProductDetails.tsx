import { IonGrid, IonRow, IonCol, IonImg, IonButton, IonContent, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import toast from "../../utils/toastsMessage";
import { useHistory, useLocation } from 'react-router-dom';
import { IProduct } from '../../interfaces/productInterface';
import { IAuthReducers } from '../../redux/reducers/auhReducers';
import { RootState } from '../../redux/reducers';
import { createCart } from '../../services/cart';



function ProductDetails() {
    const [loading, setLoading] = useState(false);
    const [totalQuantity, settotalQuantity] = useState(1);
    const { state } = useLocation();
    const navigate = useHistory();

    const product_data: IProduct = state as unknown as IProduct

    const authReducer: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const dicrease = () => {
        let decreaseQuantity;
        if (totalQuantity <= 1) {
            settotalQuantity(totalQuantity);
        } else {
            decreaseQuantity = totalQuantity - 1;
            settotalQuantity(decreaseQuantity);
        }
    };

    // Increase Quantity
    const increase = () => {
        let increaseQuantity = 0;
        increaseQuantity = totalQuantity + 1;
        settotalQuantity(increaseQuantity);
    };

    const addToCart = async () => {
        setLoading(true);
        const cart: any = {
            product_id: product_data?.id,
            user_id: authReducer.authData?.id,
            quantity: totalQuantity,
        };
        const cartResponse = await createCart(cart);
        if (cartResponse.data?.success) {
            toast.success(cartResponse.data?.message);
            navigate.push("/add-to-cart");
        }
    };

    const buyNow = () => {
        setLoading(true);
        const product_Details = {
            image: product_data?.image,
            amount: product_data?.prize,
            product_id: product_data?.id,
            user_id: product_data?.id,
            product_name: product_data?.product_name,
            description: product_data?.description,
            quantity: totalQuantity,
        };
        setLoading(false);
        navigate.push("/buy-now",product_Details );
    };

    return (
        <>
            <IonContent fullscreen={true} className="ion-padding">
                <div className="container-fluid">
                    <div className="mt-5 pt-5">
                        <IonGrid className="ion-padding">
                            <IonRow>
                                <IonCol size="12" size-md="6" size-lg="6">
                                    <IonImg
                                        src={product_data?.image}
                                        alt="The Wisconsin State Capitol building in Madison, WI at night"
                                        
                                    ></IonImg>
                                </IonCol>
                                <IonCol size="12" size-md="4" size-lg="6" className="ion-padding w-100">
                                    <h1 className="text text-info ml-5">
                                        Special Price
                                    </h1>
                                    <h1 className="text text-success">
                                        ₹{product_data?.prize * totalQuantity}
                                    </h1>
                                    <h2 className="text text-warning">
                                        $<span className='text-decoration-line-through'>{(product_data?.prize + product_data?.discount) *
                                            totalQuantity}</span>
                                    </h2>
                                    <p>
                                        <span className="btn btn-danger mx-2" onClick={dicrease}>
                                            {" "}
                                            -{" "}
                                        </span>
                                        <span className="fs-3">{totalQuantity}</span>
                                        <span className="btn btn-success mx-2" onClick={increase}>
                                            {" "}
                                            +{" "}
                                        </span>
                                    </p>
                                    <p>{product_data?.description}</p>
                                    <h1 className="m-6">Available Offer</h1>
                                    <ul className='p-0 m-0 w-100'>
                                        <li>Bank Offer5% Cashback on Flipkart Axis Bank Card</li>
                                        <li>
                                            Special PriceGet extra 9% off (price inclusive of
                                            cashback/coupon)
                                        </li>
                                        <li>
                                            Partner OfferSign up for Flipkart Pay Later and get Flipkart
                                            Gift Card worth up to ₹750*
                                        </li>
                                        <li>
                                            Partner OfferBuy this product and get upto <b>₹{product_data?.discount}
                                            </b> off on Flipkart Furniture
                                        </li>
                                        <li>
                                            Partner OfferPurchase now & get a surprise cashback coupon in
                                            February / March 2023
                                        </li>
                                    </ul>
                                </IonCol>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center mx-auto">
                                    <IonButton
                                        className="theme-button secondary-gradient-btn button-radius"
                                        type="submit"
                                        expand="block"
                                        onClick={addToCart}>
                                        Add to Cart
                                        {loading ? <IonSpinner name="dots" /> : null}
                                    </IonButton>
                                        
                                <IonButton
                                    className="theme-button secondary-gradient-btn button-radius"
                                    type="submit"
                                    expand="block"
                                    onClick={buyNow}>
                                    Buy Now
                                    {loading ? <IonSpinner name="dots" /> : null}
                                </IonButton>
                                </div>
                            </IonRow>
                        </IonGrid>
                    </div>
                </div>
            </IonContent>

        </>
    );
}
export default ProductDetails;