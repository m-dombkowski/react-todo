import { Fragment, useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import classes from "./ChangePasswordForm.module.css";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";

const ChangePasswordForm = () => {
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
 
  const [reauthenticate, setReauthenticate] = useState(false);
  const [reAuthMessage, setReAuthMessage] = useState("");
  const [successReAuth, setSuccessReAuth] = useState(null);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!userContext.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, userContext.isLoggedIn]);

  const changePasswordHandler = (event) => {
    event.preventDefault();

    updatePassword(auth.currentUser, passwordInputRef.current.value)
      .then(() => {
        console.log("git");
      })
      .catch((error) => {
        console.log(error.code);
        setError(true);
        switch (error.code) {
          case "auth/weak-password":
            setErrMsg(
              "Weak password. New password needs to be at least 6 characters long"
            );
            break;
          case "auth/requires-recent-login":
            setError(false);
            setReauthenticate(true);
            navigate("/settings/password/reauthenticate");
            break;
          default:
            setErrMsg("should not get here, rekt");
        }
      });
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={changePasswordHandler} className={classes.settingsForm}>
          <label htmlFor="emailInput">Change your password</label>
          <input ref={passwordInputRef} id="emailInput" type="password"></input>
          <button type="submit">Submit</button>
        </form>
        {successReAuth && <p>{reAuthMessage}</p>}
      </div>

      {reauthenticate && (
        <AuthenticationModal
          showForm={setReauthenticate}
          reAuth={setSuccessReAuth}
          reAuthMessage={setReAuthMessage}
        />
      )}
      {error && <p>{errMsg}</p>}
    </Fragment>
  );
};

export default ChangePasswordForm;
