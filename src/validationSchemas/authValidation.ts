import * as yup from "yup";
import { TFunction } from "i18next";
import {
  email,
  password,
  name,
  phone,
  confirm_password,
  loginPassword,
  otp,
  zip,
  city,
  state,
  country,
  address,
} from "./commonFieldVerification";

export const signupValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    name: name(translation),
    email: email(translation),
    password: password(translation),
    phone: phone(translation),
    confirm_password: confirm_password(translation),
  });

export const loginValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    email: email(translation),
    password: loginPassword(translation),
  });

export const forgetPasswordValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    email: email(translation),
  });

export const otpVerification = (translation: TFunction) =>
  yup.object().shape({
    otp: otp(translation),
  });
export const restPasswordValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    password: password(translation),
    confirm_password: confirm_password(translation),
  });


export const addressValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    state: state(translation),
    country: country(translation),
    city: city(translation),
    zip: zip(translation),
    address: address(translation),
  });
