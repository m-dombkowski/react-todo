import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebaseAuth";
import RegisterInputsValidation from "../../validation/RegisterInputValidation";

import classes from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const registerEmailInputRef = useRef();
  const registerPasswordInputRef = useRef();
  let navigate = useNavigate();

  const registerAccountHandler = async (event) => {
    event.preventDefault();
    const registerEmailInput = registerEmailInputRef.current.value;
    const registerPasswordInput = registerPasswordInputRef.current.value;

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmailInput,
        registerPasswordInput
      );
      setErrorStatus(false);
      navigate("/login");
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.emailInput}>
        <label htmlFor="email">Email</label>
        <input ref={registerEmailInputRef} type="email" id="email"></input>
      </div>
      <div className={classes.passwordInput}>
        <label htmlFor="password">Password</label>
        <input
          ref={registerPasswordInputRef}
          type="password"
          id="password"
        ></input>
      </div>
      {errorStatus && (
        <RegisterInputsValidation
          errorState={errorMessage}
          emailInput={registerEmailInputRef}
          passwordInput={registerPasswordInputRef}
        />
      )}
      <button onClick={registerAccountHandler}>Create Account</button>
    </div>
  );
};

export default RegisterForm;
