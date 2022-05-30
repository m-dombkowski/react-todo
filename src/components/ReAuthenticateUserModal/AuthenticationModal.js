import { Fragment, useRef, useState } from "react";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";

import classes from "./AuthenticationModal.module.css";

const AuthenticationModal = (props) => {
  
  const passwordRef = useRef();
  const auth = getAuth();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reAuthenticateHandler = (event) => {
    setErrorMsg("");
    event.preventDefault();
    const passwordInput = passwordRef.current.value;

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      passwordInput
    );

    console.log(credential._password);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        props.showForm(false);
        props.reAuth(true);
        props.reAuthMessage("Re-authenticated successfully!");
        setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error.code);
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMsg("Wrong password");
            break;
          case "auth/internal-error":
            setErrorMsg(`Can't leave empty fields`);
            break;
          case "auth/user-mismatch":
            setErrorMsg("Wrong credentials, please check email and password");
            break;
          default:
            setErrorMsg("Dunno");
        }
      });
  };

  return (
    <Fragment>
      <form className={classes.modalForm} onSubmit={reAuthenticateHandler}>
        <p className={classes.title}>You were logged in for too long!</p>
        <p className={classes.message}>
          {" "}
          In order to re-authenticate please pass your current credentials
        </p>

        <label
          className={classes.passwordLabel}
          htmlFor="authenticationPasswordInput"
        >
          Current Password
        </label>
        <input
          className={classes.passwordInput}
          ref={passwordRef}
          id="authenticationPasswordInput"
          type="password"
          placeholder="Password"
        />
        {error && <p className={classes.errorMessage}>{errorMsg}</p>}
        <button className={classes.reAuthButton} type="submit">
          Send
        </button>
      </form>
    </Fragment>
  );
};

export default AuthenticationModal;
