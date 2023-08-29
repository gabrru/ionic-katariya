import * as yup from "yup";
import { TFunction } from "i18next";
import {
  ALPHABATE_WITH_SPACE_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
  NUMBER_REGEX_WITH_SPACE,
  PASSWORD_REGEX,
  ALPHANUMERIC_REGEX,
  ADDRESS_REGEX,
  PHONE_REGEX,
} from "../constant/commonConstant";

/**
 * Handle validation for email field
 * @param translate i18n translate hook instance
 * @returns
 */
export const email = (translate: TFunction) =>
  yup
    .string()
    .trim()
    .required(
      translate("required_field_error", { field_label: translate("email") })
    )
    .email(
      translate("invalid_field_error", { field_name: translate("email") })
    );

/**
 * Handle validation for email field
 * @param translate i18n translate hook instance
 * @returns
 */
export const otp = (translate: TFunction) =>
  yup
    .number()
    .required(
      translate("required_field_error", { field_label: translate("email") })
    );
// .min(5, translate("min_length", { length: 5, length_type: "digits" }))
// .max(5, translate("max_length", { length: 5, length_type: "digits" }));

/**
 * Common validation schema
 * @param translate i18n translate hook instance
 * @returns
 */
export const zip = (translate: TFunction) =>
  yup
    .string()
    .trim()
    .required(
      translate("required_field_error", {
        field_label: translate("zip"),
      })
    )
    .matches(
      NUMBER_REGEX,
      translate("invalid_field_error", {
        field_name: translate("zip"),
      })
    )
    .min(5, translate("min_length", { length: 5, length_type: "digits" }))
    .max(6, translate("max_length", { length: 6, length_type: "digits" }));

export const name = (translate: TFunction) =>
  yup
    .string()
    .trim()
    .required("this field is  Required fields")
    .matches(NAME_REGEX, "contains_only_alphanumeric")
    .max(25, "max_len_25");

/**
 * Handle validation for city field
 * @param translate i18n translate hook instance
 * @returns
 */
export const city = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", { field_label: translate("city") })
    )
    .test(
      "isNumberSpace",
      translate("contains_only_alphanumeric"),
      (value) => !NUMBER_REGEX_WITH_SPACE.test(value as string)
    )
    .max(25, translate("max_len_25"));

export const country = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", { field_label: translate("state") })
    )
    .matches(ALPHABATE_WITH_SPACE_REGEX, translate("contains_only_alphabets"))
    .max(50, translate("max_len_50"));

export const address = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", { field_label: translate("state") })
    )
    .matches(ALPHABATE_WITH_SPACE_REGEX, translate("contains_only_alphabets"))
    .max(150, translate("max_len_50"));
export const state = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", { field_label: translate("state") })
    )
    .matches(ALPHABATE_WITH_SPACE_REGEX, translate("contains_only_alphabets"))
    .max(50, translate("max_len_50"));

/**
 * Handle validation for password field
 * @param translate i18n translate hook instance
 * @returns
 */
export const confirm_password = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", {
        field_label: translate("Password"),
      })
    )
    // .matches(translate("pass_reg_ms"))
    .oneOf([yup.ref("password")], "Password Does Not Match !!!");

/**
 * Handle validation for password field
 * @param translate i18n translate hook instance
 * @returns
 */
export const password = (translate: TFunction) =>
  yup
    .string()
    .required(
      translate("required_field_error", {
        field_label: translate("Password"),
      })
    )
    // .matches(translate("pass_reg_ms"));

/**
 * Handle validation for phone field
 * @param translate i18n translate hook instance
 * @returns
 */
export const phone = (translate: TFunction) =>
  yup
    .string()
      .required(translate("phone_req"))
      // .matches(PHONE_REGEX, translate("phone_valid"))
      .min(10, translate("phone_no_should_be_at_least_10_digits"))
      .max(12, translate("phone_no_should_not_be_more_than_14_digits"))
// .matches(PHONE_NUMBER_REGEX, translate("invalid_phone"));

// export const firstName = (translate: TFunction) =>
//   yup
//     .string()
//     .trim()
//     .required("this field is  Required fields")
//     .matches(NAME_REGEX, translate("contains_only_alphanumeric"))
//     .max(25, translate("max_len_25"));

export const Firstname = (translate: TFunction) =>
  yup
    .string()
    .trim()
    .required("this field is  Required fields")
    .matches(NAME_REGEX, "contains_only_alphanumeric")
    .max(25, "max_len_25");

export const lastName = (translate: TFunction) =>
  yup
    .string()
    .trim()
    .required("this field is  Required fields")
    .matches(NAME_REGEX, "contains_only_alphanumeric")
    .max(25, "max_len_25");

export const loginPassword = (translate: TFunction) =>
  yup.string().required(
    translate("required_field_error", {
      field_label: translate("Password"),
    })
  );

export const image = (translate: TFunction) =>
  yup.string().required(
    translate("required_Field_error", {
      field_label: translate("image"),
    })
  );

export const prize = (translate: TFunction) =>
  yup.number().required(
    translate("required_Field_error", {
      field_label: translate("prize"),
    })
  );

export const discount = (translate: TFunction) =>
  yup.number().required(
    translate("required_Field_error", {
      field_label: translate("discount"),
    })
  );

export const description = (translate: TFunction) =>
  yup.string().required(
    translate("required_Field_error", {
      field_label: translate("description"),
    })
  );

export const product_category = (translate: TFunction) =>
  yup.string().required(
    translate("required_Field_error", {
      field_label: translate("product_category"),
    })
  );

export const product_name = (translate: TFunction) =>
  yup.string().required(
    translate("required_Field_error", {
      field_label: translate("product_name"),
    })
  );
