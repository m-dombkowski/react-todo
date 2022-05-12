import { useEffect, useState } from "react";

const LoginErrorModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorType = props.errorState.code;
  console.log(errorType);
  useEffect(() => {
    switch (errorType) {
      case "auth/wrong-password":
        setErrorMessage("Wrong Password. Please Try Again");
        break;
      case "auth/user-not-found":
        setErrorMessage("Wrong Email address. Please Try Again");
        break;
      default:
        setErrorMessage("no clue");
    }
  }, [errorType]);

  return <div>{errorMessage}</div>;
};

export default LoginErrorModal;
