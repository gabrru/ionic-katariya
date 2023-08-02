import TFunction from "i18next";
import * as yup from "yup";
import {image, prize, description, discount, product_category, product_name} from "./commonFieldVerification";



export const productValidationSchema = (translation: any) =>
  yup.object().shape({
    prize: prize(translation),
    discount: discount(translation),
    description: description(translation),
    product_name: product_name(translation),
    image: image(translation),
    product_category: product_category(translation),
  });
