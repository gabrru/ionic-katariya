import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { ISignup} from "../../interfaces/authInterface";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { signupValidationSchema } from "../../validationSchemas/authValidation";
import { signUp } from "../../services/auth";
import toast from "../../utils/toastsMessage";
import { ROLES } from "../../constant/commonConstant";

import React from 'react'
import { IonButton, IonContent, IonSpinner } from "@ionic/react";
import CommonInput from "../../commonField/CommonInput";

const Signup: React.FC = () => {

    const { t: translation } = useTranslation();
    const navigate = useHistory();
    const [loading, setLoading] = useState<boolean>(false);



    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupValidationSchema(translation)) });

    const onSubmit = async (data: ISignup) => {
        setLoading(true);
        try {
            const signUpRes = await signUp({ ...data, account_type: ROLES.USER });
            if (signUpRes?.data?.success) {
                toast.success(translation(signUpRes?.data?.message));
                setLoading(false);
                navigate.push(`/login`);
            } else {
                setLoading(false);
                toast.error(
                    translation(signUpRes?.data?.message ?? "something_went_wrong")
                );
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };

  return (
    <>
          <IonContent fullscreen={true} className="ion-padding">
          <div className="App">
              <div className="container py-5 text-center">
                  <div className="card border-0 w-75 p-3">
                      <IonContent>
                          <div className="userauth-main">
                              <div className="main-container userauth-form">
                                  <h1>Signup</h1>

                                  <form
                                      onSubmit={handleSubmit((data) => onSubmit(data as ISignup))}
                                  >
                                      <div className="form-group">
                                          {/* <label>name</label> */}
                                          <div className="input-icon">
                                              <CommonInput
                                                  control={control}
                                                  type="text"
                                                  className="form-control"
                                                  placeHolder="name"
                                                  name="name"
                                                  error={errors?.name}
                                                  fieldType="input"
                                              />
                                          </div>
                                      </div>

                                      <div className="form-group mb0">
                                          {/* <label>Email</label> */}
                                          <div className="input-icon">
                                              <CommonInput
                                                  control={control}
                                                  type="email"
                                                  className={classNames("form-control icon-padding", {
                                                      "is-invalid": errors?.email,
                                                  })}
                                                  placeHolder="email"
                                                  name="email"
                                                  error={errors?.email}
                                                  fieldType="input"
                                              />
                                          </div>
                                      </div>
                                      <div className="form-group mb0">
                                          {/* <label>Phone</label> */}
                                          <div className="input-icon">
                                              <CommonInput
                                                  control={control}
                                                  type="text"
                                                  className={classNames("form-control icon-padding", {
                                                      "is-invalid": errors?.phone,
                                                  })}
                                                  placeHolder="phone"
                                                  name="phone"
                                                  error={errors?.phone}
                                                  fieldType="input"
                                              />
                                          </div>
                                      </div>
                                      <div className="form-group mb0">
                                          {/* <label>Password</label> */}
                                          <div className="input-icon">
                                              <CommonInput
                                                  control={control}
                                                  type="password"
                                                  className={classNames("form-control icon-padding", {
                                                      "is-invalid": errors?.password,
                                                  })}
                                                  placeHolder="password"
                                                  name="password"
                                                  error={errors?.password}
                                                  fieldType="input"
                                              />
                                          </div>
                                      </div>
                                      <div className="form-group mb0">
                                          {/* <label>Confirm Password</label> */}
                                          <div className="input-icon">
                                              <CommonInput
                                                  control={control}
                                                  type="password"
                                                  className={classNames("form-control icon-padding", {
                                                      "is-invalid": errors?.confirm_password,
                                                  })}
                                                    placeHolder="confirm_password"
                                                    name="confirm_password"
                                                    error={errors?.confirm_password}
                                                  fieldType="input"
                                              />
                                          </div>
                                      </div>

                                      <IonButton
                                          className="theme-button secondary-gradient-btn button-radius"
                                          type="submit"
                                          expand="block">
                                          Signup
                                          {loading ? <IonSpinner name="dots" /> : null}
                                      </IonButton>
                                  </form>

                                  <div className="form-bottom mt20">
                                      <p className="text-center mb10">
                                          If you have already account
                                          <span>
                                              <Link to="/login"> login</Link>
                                          </span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </IonContent>
                  </div>
              </div>
          </div>
          </IonContent>
    </>
  )
}

export default Signup