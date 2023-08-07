import { IonGrid, IonRow, IonCol, IonImg, IonButton, IonContent } from '@ionic/react';
import React, { useEffect, useState } from 'react';



function ProductDetails() {

    return (
        <>
        <IonContent fullscreen={true} className="ion-padding">
            <div className="container-fluid">
                <div className="mt-5 pt-5">
                    <IonGrid className="ion-padding">
                        <IonRow>
                            <IonCol size="12" size-md="6" size-lg="6">
                                <IonImg
                                    src="https://docs-demo.ionic.io/assets/madison.jpg"
                                    alt="The Wisconsin State Capitol building in Madison, WI at night"
                                ></IonImg>
                            </IonCol>
                            <IonCol size="12" size-md="4" size-lg="6" className="ion-padding w-100">
                                <h1 className="text text-info ml-5">
                                    Special Price
                                </h1>
                                <h1 className="text text-success">
                                    $20
                                </h1>
                                <h2 className="text text-warning">
                                    $<span className='text-decoration-line-through'>25</span>
                                </h2>
                                <p>
                                    <span className="btn btn-danger mx-2">
                                        {" "}
                                        -{" "}
                                    </span>
                                    <span className="fs-3">1</span>
                                    <span className="btn btn-success mx-2">
                                        {" "}
                                        +{" "}
                                    </span>
                                </p>
                                <p>This is a good Product</p>
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
                                        Partner OfferBuy this product and get upto <b>₹
                                            </b> off on Flipkart Furniture
                                    </li>
                                    <li>
                                        Partner OfferPurchase now & get a surprise cashback coupon in
                                        February / March 2023
                                    </li>
                                </ul>
                            </IonCol>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center mx-auto">
            <button className="btn btn-info" type="submit" onClick={addToCart}>
              {loading ? (
                <>
                  {/* <Loading /> */}
                </>
              ) : (
                <>Add To Cart</>
              )}
            </button>
            <button className="btn btn-info" type="submit" onClick={buyNow}>
              {loading ? (
                <>
                  Loading
                </>
              ) : (
                <>Buy Now</>
              )}
            </button>
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