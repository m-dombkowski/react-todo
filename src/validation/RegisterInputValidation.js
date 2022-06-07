import { useEffect, useState } from "react";
import RegisterErrorModal from "../ui/ErrorModal/RegisterErrorModal";

const RegisterInputsValidation = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const errorType = props.errorState.code;
  const email = props.emailInput.current.value;
  const password = props.passwordInput.current.value;

  useEffect(() => {
    if (email.length === 0 || password.length === 0) {
      setErrorMessage("Can't leave blank fields");
      return;
    }

    switch (errorType) {
      case "auth/missing-email":
        setErrorMessage("E-mail field can't be empty");
        break;
      case "auth/invalid-email":
        setErrorMessage("Wrong e-mail format. Example: example@test.gg");
        break;
      case "auth/weak-password":
        setErrorMessage("Password should be at least 6 characters");
        break;
      case "auth/internal-error":
        setErrorMessage("Error. Can't leave blank field");
        break;
      case "auth/email-already-in-use":
        setErrorMessage("This e-mail is already taken");
        break;
      default:
        setErrorMessage("There was an error, please try again");
    }
  }, [errorType, email, password]);

  return <RegisterErrorModal errorMessage={errorMessage} />;
};

export default RegisterInputsValidation;
