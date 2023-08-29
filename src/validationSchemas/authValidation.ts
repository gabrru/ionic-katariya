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
import { PASSWORD_REGEX } from "../constant/commonConstant";

export const signupValidationSchema = (translation: TFunction) =>
  yup.object().shape({
    name: name(translation),
    email: email(translation),
    phone: phone(translation),
    password: yup
      .string()
      .required(translation("pass_req"))
      .matches(PASSWORD_REGEX, translation("pass_reg_ms"))
      .max(25, translation("max_len_25")),
    confirm_password: yup.string()
      .required('Password is mendatory')
      .oneOf([yup.ref('password')], 'Passwords does not match'),
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
