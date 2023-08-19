import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { IonGrid, IonRow, IonCol, IonItem, IonInput, IonContent, IonLabel, IonTextarea, IonButton, IonSpinner } from '@ionic/react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { insertAddress, userInfo } from '../../services/auth';
import { IAddress, IFillAddress } from '../../interfaces/commonInterface';
import { addressValidationSchema } from '../../validationSchemas/authValidation';
import { IAuthReducers } from '../../redux/reducers/auhReducers';
import { RootState } from '../../redux/reducers';
import { IUserInfo } from '../../interfaces/authInterface';
import toast from '../../utils/toastsMessage';
import { IByAllProduct, IProduct } from '../../interfaces/productInterface';

const BuyNow = () => {

  const navigate: any = useHistory();
  const location: any = useLocation();
  const { state }: any = useLocation();
  const product_data: IProduct = state as unknown as IProduct
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [userAccount, setUserAccount] = useState([]);
  const [amount, setAmount] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);
  const { t: translation } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addressValidationSchema(translation)),
  });

  const authReducer: IAuthReducers = useSelector(
    (state: RootState) => state.AuthReducers
  );
  const user_info = async () => {
    setLoading(true);
    const data = {
      user_id: authReducer.authData?.id as unknown as string,
    };
    const getInfo = await userInfo(data as IUserInfo);
    if (getInfo.data?.success) {
      console.log("getInfo.data?.data.country", getInfo.data?.data[0]?.country);
      reset({
        country: getInfo.data?.data[0]?.country,
        state: getInfo.data?.data[0]?.state,
        city: getInfo.data?.data[0]?.city,
        zip: getInfo.data?.data[0]?.zip,
        address: getInfo.data?.data[0]?.address,
      });
      setUserAccount(getInfo.data?.data);
      setLoading(false);
    } else {
      console.log("SomeThing_Went_wrong!!!");
      setLoading(false);
    }
  };

  useEffect(() => {
    user_info();
  }, []);

  const details = () => {
    if (location.state?.length > 1) {
      const rsp = location.state;
      let quantity = 0;
      let total_amount = 0;
      let discount = 0;
      rsp.forEach((item: any) => {
        quantity += item.quantity;
        total_amount += item.product_id.prize * item.quantity;
        discount += item.product_id.discount * item.quantity;
      });
      setTotalAmount(total_amount);
      setTotalDiscount(discount);
      settotalQuantity(quantity);
      setAmount(totalAmount);
    } else {
      setTotalAmount(location.state?.amount * location.state?.quantity);
      setAmount(location.state?.amount * location.state?.quantity);
      settotalQuantity(location.state?.quantity);
      setTotalDiscount(location.state?.Discount);
    }
  };

  useEffect(() => {
    details();
  });

  // handle formSubmit
  const onSubmit = async (data: IAddress) => {
    setLoading(true)
    const insert_address = {
      country: data.country,
      state: data.state,
      city: data.city,
      zip: data.zip,
      address: data.address,
      user_id: authReducer.authData?.id
        ? authReducer.authData?.id
        : location.state?.id,
    };
    const createAddress = await insertAddress(insert_address);
    if (createAddress.data?.success) {
      const address_id = createAddress.data?.data.address_id;
      if (location.state.length > 1) {
        const place_all_order: IByAllProduct[] = [];
        location.state?.forEach((item: any) => {
          const data1: IByAllProduct = {
            address_id: address_id,
            amount: item.product_id.prize,
            product_id: item.product_id.id,
            user_id: item.user_id.id,
            quantity: item.quantity,
          };
          place_all_order.push(data1);
        });
        setLoading(false)
        navigate.push("/order-payment", place_all_order);
      } else {
        setLoading(true);
        const total_amount = location.state?.amount * location.state?.quantity;
        const order_details = {
          address_id: address_id,
          amount: total_amount,
          product_id: location.state?.product_id,
          user_id: authReducer.authData?.id,
          product_name: location.state?.product_name,
          quantity: location.state?.quantity,
        };

        setLoading(false);
        toast.success(createAddress.data?.success);
        navigate.push("/order-payment", order_details)
      }
    } else {
      setLoading(false);
      toast.error(createAddress.data?.data);
    }
  };

  return (
    <>
      <IonContent fullscreen={true} className="ion-padding">
        <div className="container-fluid">
          <div className="mt-1 pt-1">
            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol size="12" size-md="4" size-lg="6" className="ion-padding w-100">
                  <div className="mt-3 ml-0 p-0">
                    <table className="table w-100 table table-success table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Total Discount</td>
                          <td>₹{totalDiscount}</td>
                        </tr>

                        <tr>
                          <th scope="row">2</th>
                          <td>Quantity</td>
                          <td> {totalQuantity}</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Txt</td>
                          <td>₹0</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Amount</td>
                          <td>₹{amount}</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Shipping</td>
                          <td>₹0</td>
                        </tr>
                        <tr>
                          <th scope="row">6</th>
                          <td>Total</td>
                          <td>₹{totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </IonCol>
                <IonCol size="12" size-md="6" size-lg="6">
                  <div className="card border-0 w-100 p-1">
                    <h1 style={{ color: "#6610f2" }}>Shipping Address</h1>
                    <form
                      action=""
                      onSubmit={handleSubmit((data) => onSubmit(data as IAddress))}
                    >
                      <div className="form-group">
                        <IonItem>
                          {/* <IonLabel position="floating" className='m-2'>Country Name:</IonLabel> */}
                          <IonInput className={classNames("", {
                            "is-invalid": errors.country,
                          })}
                            id="country"
                            placeholder="Enter Your country Name Here"
                            {...register("country")}
                            name="country" />
                          {errors.country && (
                            <div className="invalid-feedback">
                              {errors.country?.message}{" "}
                            </div>
                          )}
                        </IonItem>
                      </div>
                      <div className="form-group">
                        <IonItem>
                          {/* <IonLabel position="floating" className='m-2'>State:</IonLabel> */}
                          <IonInput
                            className={classNames("", {
                              "is-invalid": errors?.state,
                            })}
                            id="state"
                            placeholder="Enter state Here"
                            {...register("state")}
                            name="state" />
                          {errors.state && (
                            <div className="invalid-feedback">
                              {errors.state?.message}{" "}
                            </div>
                          )}
                        </IonItem>
                      </div>
                      <div className="form-group">
                        <IonItem>
                          {/* <IonLabel position="floating" className='m-2'>City:</IonLabel> */}
                          <IonInput
                            className={classNames("", {
                              "is-invalid": errors.city,
                            })}
                            id="discount"
                            placeholder="Enter city Name"
                            {...register("city")}
                            name="city" />
                          {errors.city && (
                            <div className="invalid-feedback">
                              {errors.city?.message}{" "}
                            </div>
                          )}
                        </IonItem>
                      </div>
                      <div className="form-group">
                        <IonItem>
                          {/* <IonLabel position="floating" className='m-2'>Zip:</IonLabel> */}
                          <IonInput
                            className={classNames("", {
                              "is-invalid": errors.zip,
                            })}
                            id="zip"
                            placeholder="Enter zip Code:"
                            {...register("zip")}
                            name="zip" />
                          {errors.zip && (
                            <div className="invalid-feedback">
                              {errors.zip?.message}{" "}
                            </div>
                          )}
                        </IonItem>
                      </div>
                      <div className="form-group">
                        <IonItem>
                          {/* <IonLabel position="floating" className='m-2'>Enter Your Full Address:</IonLabel> */}
                          <IonTextarea className={classNames("", {
                            "is-invalid": errors.address,
                          })}
                            id="address"
                            placeholder="Enter Your Full Address Here"
                            {...register("address")}
                            name="address" />
                          {errors.address && (
                            <div className="invalid-feedback">
                              {errors.address?.message}{" "}
                            </div>
                          )}
                        </IonItem>
                      </div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center mx-auto">
                        <IonButton
                          className="theme-button secondary-gradient-btn button-radius "
                          type="submit"
                          expand="block"
                          style={{ width: "120px" }}
                        >

                          {loading ? <IonSpinner name="dots" /> : "Order Now"}
                        </IonButton>
                      </div>
                    </form>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </>
  )
}

export default BuyNow