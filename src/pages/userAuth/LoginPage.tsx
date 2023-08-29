import React, { useState } from "react";
import { IonButton, IonInput, IonLabel, IonHeader, IonContent, IonRow, IonCol, IonTitle, IonSpinner } from "@ionic/react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Storage from "../../utils/storage"
import { ILoginData } from "../../interfaces/authInterface";
import { login } from "../../services/auth";
import { loginValidationSchema } from "../../validationSchemas/authValidation";
import toast from "../../utils/toastsMessage";
import ActionType from "../../resources/enums";


const LoginPage = () => {
    const { t: translation } = useTranslation();
    const navigate = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginValidationSchema(translation)),
    });



    //   Login Submit
    const onSubmit = async (data: ILoginData) => {
        setLoading(true);
        const loginRes = await login(data);
        if (loginRes?.data?.success) {
            // if (
            //   loginRes?.data?.data.account_type === ROLES.USER &&
            //   route === ROUTES.LOGIN
            // ) {
            const userData = loginRes?.data?.data;
            // const address = JSON.parse(loginRes?.data?.data.address);
            await dispatch({
                type: ActionType.LOGIN,
                payload: { ...loginRes?.data },
            });
            toast.success(translation(loginRes?.data?.message));
            await Storage.set("__KTR__", userData?.token);
            await Storage.set("authData", JSON.stringify(userData));
            console.log("loginRes?.data?.message", loginRes?.data?.message);
            navigate.push("/home");
            // } else if {
            //   toast.error(translation("wrong_account_type"));
            // }
        } else {
            toast.error(
                translation(loginRes?.data?.message ?? "something_went_wrong")
            );
        }

        setLoading(false);
    };

    return (
        <>
            <div className="App">
                <div className="container py-5 text-center">
                    <div className="card border-0 w-75 p-3">
                        <IonContent>
                            <div className="userauth-main">
                                <div className="main-container userauth-form">
                                    <h1>Login</h1>

                                    <form
                                        onSubmit={handleSubmit((data) => onSubmit(data as ILoginData))}
                                    >
                                        <div className="form-group mb0">
                                            <label>Email</label>
                                            <div className="input-icon">
                                                <input
                                                    type="text"
                                                    className={classNames("form-control icon-padding", {
                                                        "is-invalid": errors.email,
                                                    })}
                                                    id="email"
                                                    placeholder="Enter Your E-mail Address"
                                                    {...register("email", { required: true })}
                                                    name="email"
                                                />
                                            </div>
                                            {errors.email && (
                                                <div className="invalid-feedback text-danger">
                                                    Email is Required field{" "}
                                                </div>
                                            )}
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className={classNames("form-control", {
                                                    "is-invalid": errors.password,
                                                })}
                                                id="password"
                                                placeholder="Enter Your Password"
                                                {...register("password")}
                                                name="password"
                                            />
                                            {errors.password?.type === "required" && (
                                                <div className="invalid-feedback">
                                                    Password is Required field{" "}
                                                </div>
                                            )}
                                            {errors.password?.type === "minLength" && (
                                                <div className="invalid-feedback text-danger">
                                                    Please Enter password is minimum 8 Charcters !!!
                                                </div>
                                            )}
                                        </div> */}

                                        <div className="form-group mb0">
                                            <label>Password</label>
                                            <div className="input-icon">
                                                <input
                                                    type="password"
                                                    className={classNames("form-control icon-padding", {
                                                        "is-invalid": errors.password,
                                                    })}
                                                    id="password"
                                                    placeholder="Enter Your Password Here"
                                                    {...register("password")}
                                                    name="password"
                                                />
                                            </div>
                                            {errors.password?.type === "required" && (
                                                <div className="invalid-feedback">
                                                    Password is Required field{" "}
                                                </div>
                                            )}
                                            {errors.password?.type === "minLength" && (
                                                <div className="invalid-feedback text-danger">
                                                    Please Enter password is minimum 8 Charcters !!!
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right mb20 mt10">
                                            <Link to="/forget-password">
                                                forgot_password
                                            </Link>
                                        </div>

                                        <IonButton
                                            className="theme-button secondary-gradient-btn button-radius"
                                            type="submit"
                                            expand="block">
                                            login
                                            {loading ? <IonSpinner name="dots" /> : null}
                                        </IonButton>
                                    </form>

                                    <div className="form-bottom mt20">
                                        <p className="text-center mb10">
                                            don`t_have_an_account
                                            <span>
                                                <Link to="/signup"> sign_up</Link>
                                            </span>
                                        </p>

                                        {/* <div className="form-or">
                                            <p>or_login_using</p>
                                        </div> */}

                                        {/* <SocialLogin /> */}
                                    </div>
                                </div>
                            </div>
                        </IonContent>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;
