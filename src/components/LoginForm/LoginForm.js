import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import LoginValidation from "../../validation/LoginValidation";
import img from "../../assets/beachWithMountains.jpg";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import Spinner from "../../ui/Spinner/Spinner";

const LoginForm = () => {
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginFormHandler = async (event) => {
    event.preventDefault();
    setSpinner(true);
    setErrorMessage("");
    setErrorStatus(false);
    const loginEmail = emailInputRef.current.value;
    const loginPassword = passwordInputRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      navigate("/");
      setSpinner(false);
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      setErrorStatus(true);
      setSpinner(false);
      setErrorMessage(error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.photoSection}>
        <img
          className={classes.img}
          src={img}
          alt="sand beach with mountains and sea in the background"
        />
      </div>
      <form onSubmit={loginFormHandler} className={classes.loginForm}>
        <h1 className={classes.loginFormTitle}>Sign in here!</h1>
        <div className={classes.emailInputContainer}>
          <label className={classes.emailLabel} htmlFor="email">
            Email
          </label>
          <input
            className={classes.emailInput}
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="example@example.org"
          ></input>
        </div>
        <div className={classes.passwordInputContainer}>
          <label className={classes.passwordLabel} htmlFor="password">
            Password
          </label>
          <input
            className={classes.passwordInput}
            ref={passwordInputRef}
            type="password"
            id="password"
            placeholder="Your password"
          ></input>
        </div>
        {spinner && (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        )}
        {errorStatus && <LoginValidation errorState={errorMessage} />}
        <div className={classes.loginControlButtons}>
          <button className={classes.login} type="submit">
            Login
          </button>
          <Link className={classes.redirectRegister} to="/register"></Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
