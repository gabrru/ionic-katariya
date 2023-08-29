export const ROUTES = {
  SIGN_UP: "/sign-up",
  DATE: "/date",
  LOGIN: "/login",
  HOME: "/home",
  HOME1: "/",
  RESET: "/reset",
  VERIFY: "/otpverification",
  FORGET_PASSWORD: "/forget-password",
  ADD_PRODUCT: "/add-product",
  PRODUCT_DETAILS: "/product-details",
  BUY_NOW: "/buy-now",
  ORDER_PAYMENT: "/order-payment",
  ADD_TO_CART: "/cart",
  GET_USER_ORDER: "/get-user-order",
  USER_ACCOUNT: "/user-account",
  ORDER : "/order",
  ABOUT : "/about",
  PAYMENT : "/payment"
};

export const BEFORE_LOGIN_ROUTE = [
  ROUTES.SIGN_UP,
  ROUTES.LOGIN, 
]
export const AFTER_LOGIN_ROUTE = [
  ROUTES.GET_USER_ORDER,
  ROUTES.ADD_PRODUCT,
  ROUTES.BUY_NOW,
  ROUTES.ORDER_PAYMENT,
  ROUTES.ORDER,
  ROUTES.HOME,
  ROUTES.PRODUCT_DETAILS,
  ROUTES.PAYMENT,
  ROUTES.ADD_TO_CART
];

export const ACCOUNT_TYPE = {
  ADMIN :"admin",
  USER : "user"

}