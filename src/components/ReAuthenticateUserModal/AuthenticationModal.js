import { useRef, useState } from "react";
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
    setError(false);
    setErrorMsg("");
    event.preventDefault();
    const passwordInput = passwordRef.current.value;

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      passwordInput
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        props.showForm(false);
        props.reAuth(true);
        props.reAuthMessage("Re-authenticated successfully!");
        setError(false);
      })
      .catch((error) => {
        setError(true);
        switch (error.code) {
          case "auth/wrong-password":
            setErrorMsg("Wrong password");
            break;
          case "auth/internal-error":
            setErrorMsg(`Can't leave empty field`);
            break;
          case "auth/user-mismatch":
            setErrorMsg("Wrong credentials, please try again");
            break;
          default:
            setErrorMsg("Dunno");
        }
      });
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.formContainer}>
        <div className={classes.modalHeader}>
          <p className={classes.title}>You were logged in for too long!</p>
        </div>
        <form className={classes.modalForm} onSubmit={reAuthenticateHandler}>
          <p className={classes.message}>
            {" "}
            In order to re-authenticate you need to log in again.
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

          <button className={classes.reAuthButton} type="submit">
            Send
          </button>
          {error && <p className={classes.errorMessage}>{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthenticationModal;
