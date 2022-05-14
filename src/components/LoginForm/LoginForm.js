import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebaseAuth";
import LoginValidation from "../../validation/LoginValidation";

const LoginForm = () => {
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginFormHandler = async (event) => {
    event.preventDefault();

    const loginEmail = emailInputRef.current.value;
    const loginPassword = passwordInputRef.current.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
      setErrorStatus(false);
      navigate("/");
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={loginFormHandler}>
        <div className={classes.emailInput}>
          <label htmlFor="email">Email</label>
          <input ref={emailInputRef} type="email" id="email"></input>
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password">Password</label>
          <input ref={passwordInputRef} type="password" id="password"></input>
        </div>
        {errorStatus && <LoginValidation errorState={errorMessage} />}
        <div className={classes.loginControlButtons}>
          <button type="submit">Login</button>
          <Link to="/register">No account? Sign up!</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
