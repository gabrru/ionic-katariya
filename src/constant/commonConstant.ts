export const ROLES = {
  USER: "customer",
  ADMIN: "Admin",
};
export const PHONE_REGEX = /^(\+\d{1,3}[- .]?)?\d{10,12}$/;
export const ALPHABATE_WITH_SPACE_REGEX = /^[a-zA-Z ]*$/;
export const NAME_REGEX = /^[ a-zA-Z0-9\-’]+$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const NUMBER_REGEX_WITH_SPACE = /^[0-9 ]*$/;
export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
export const ALPHANUMERIC_REGEX = /^[a-z\d\-_\s]+$/i;
export const ADDRESS_REGEX = /^[a-zA-Z0-9\s,._'"/\\-]*$/;
