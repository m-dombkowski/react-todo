import { useState, useEffect } from "react";
import LoginErrorModal from "../ui/ErrorModal/LoginErrorModal";

const LoginValidation = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorType = props.errorState.code;

  useEffect(() => {
    if (errorType) {
      setErrorMessage("Login failed. Invalid e-mail or password");
    }
  }, [errorType]);

  return <LoginErrorModal error={errorMessage} />;
};
export default LoginValidation;
