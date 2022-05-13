import { useEffect, useState } from "react";

const LoginErrorModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const errorType = props.errorState.code;

  useEffect(() => {
    if (errorType) {
      setErrorMessage("Login failed. Invalid e-mail or password");
    }
  }, [errorType]);

  return <div>{errorMessage}</div>;
};

export default LoginErrorModal;

// switch (errorType) {
//   case "auth/wrong-password" || "auth/user-not-found":

//     break;
//   default:
//     setErrorMessage("no clue");
// }
