import cogoToast from "cogo-toast";

const toast = {
  success: (message: string) => {
    const options: object = {
      position: "top-right",
      heading: "Success",
    };
    cogoToast.success(message, options);
  },

  error: (message: string) => {
    const options: object = {
      position: "top-right",
      heading: "Error",
    };
    cogoToast.error(message, options);
  },

  info: (message: string) => {
    const options: object = {
      position: "top-right",
      heading: "Alert",
    };
    cogoToast.info(message, options);
  },
};

export default toast;
