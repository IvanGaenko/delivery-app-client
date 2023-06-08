import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { recaptchaSiteKey } from "../config";
import CartService from "../services/cart.service";

const RecaptchaContainer = ({ setIsValidCaptcha }) => {
  const captchaRef = useRef(null);

  const verifyCaptcha = async () => {
    const token = captchaRef.current.getValue();

    const verifyToken = await CartService.verifyCaptchaToken(token);

    if (verifyToken.data.success === true) {
      setIsValidCaptcha(true);
    }
  };

  return (
    <ReCAPTCHA
      sitekey={recaptchaSiteKey}
      ref={captchaRef}
      onChange={verifyCaptcha}
    />
  );
};

export default RecaptchaContainer;
