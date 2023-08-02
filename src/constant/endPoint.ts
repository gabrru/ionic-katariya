const ROUTES = {
  auth: {
    LOGIN: "/auth/login",
    GOOGLE: "/auth/googlelogin",
    FACEBOOK: "/auth/fblogin",
    FORGOT_PASSWORD: "/auth/forgetpassword",
    VERIFY_OTP: "/auth/otpverification",
    RESET_PASSWORD: "/auth/changepassword",
    ACTIVATE_DEACTIVATE_USER: "/auth/status/update",
    SIGNUP: "auth/signup",
    MATCH_TOKEN: "/auth/match-token",
    CREATE_ADDRESS: "/address/insert-address",
    GET_ADDRESS: "/address/get-address",
  },
  product: {
    ADD_PRODUCT: "/product/add-product",
    MAN_PRODUCT: "/product/man-product",
    WOMAN_PRODUCT: "/product/woman-product",
    ELECTRONIC_PRODUCT: "/product/electronic-product",
    HOME_PRODUCT: "/product/home-product",
    ALL_PRODUCT : "/product/get-product",
  },
  payment: {
    CREATE_CUSTOMER: "/translation/create_customer",
    CREATE_PAYMENT: "/translation/strip",
    CREATE_ORDER: "/order/create-order",
    CREATE_ALL_ORDER: "/order/create-all-order",
  },
  cart : {
    CREATE_CART : "/cart/create-cart",
    GET_CART : "/cart/get-cart"
  },
  order : {
    GET_USER_ORDER : "/order/get-order"
  }
};
export default ROUTES;
