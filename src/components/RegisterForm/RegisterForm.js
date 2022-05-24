import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseAuth";
import RegisterInputsValidation from "../../validation/RegisterInputValidation";
import { writeUserToDb } from "../../firebase/firebaseDatabase";
import img from "../../assets/fallingStar.jpg";
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

      writeUserToDb();
      setErrorStatus(false);
      navigate("/");
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.photoSection}>
        <img
          className={classes.img}
          src={img}
          alt="falling star at the night sky"
        />
      </div>
      <form onSubmit={registerAccountHandler} className={classes.registerForm}>
        <h2 className={classes.registerFormTitle}>It's that simple!</h2>
        <p className={classes.registerFormTitleInstruction}>
          Create your own account in just a few seconds.
        </p>
        <div className={classes.emailInputContainer}>
          <label className={classes.emailLabel} htmlFor="email">
            Email
          </label>
          <input
            className={classes.emailInput}
            ref={registerEmailInputRef}
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
            ref={registerPasswordInputRef}
            type="password"
            id="password"
            placeholder="Your Password"
          ></input>
          <p className={classes.passwordInfo}>Min. 6 characters</p>
          {errorStatus && (
            <RegisterInputsValidation
              errorState={errorMessage}
              emailInput={registerEmailInputRef}
              passwordInput={registerPasswordInputRef}
            />
          )}
        </div>
        <div className={classes.registerControlButtons}>
          <button className={classes.registerButton} type="submit">
            Create Account
          </button>
          <Link className={classes.redirectLogin} to="/login"></Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
