import { Fragment, useRef } from "react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { useState } from "react";

const AuthenticationModal = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reAuthenticateHandler = (event) => {
    event.preventDefault();
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    const credential = EmailAuthProvider.credential(emailInput, passwordInput);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        setSuccess(true);
        setSuccessMessage(`Email address updated, new email ${emailInput}`);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error.code);
        switch (error.code) {
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
      <form onSubmit={reAuthenticateHandler}>
        <p>
          You were logged in for too long, please pass your current credentials
        </p>
        <label htmlFor="authenticationEmailInput">Current Email</label>
        <input ref={emailRef} id="authenticationEmailInput" type="email" />
        <label htmlFor="authenticationPasswordInput">Current Password</label>
        <input
          ref={passwordRef}
          id="authenticationPasswordInput"
          type="password"
        />
        <button type="submit">Send</button>
        {success && <p>{successMessage}</p>}
        {error && <p>{errorMsg}</p>}
      </form>
    </Fragment>
  );
};

export default AuthenticationModal;
