import { Fragment, useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import classes from "./ChangePasswordForm.module.css";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";
import {
  emptyField,
  samePasswordCheck,
  validateByErrorMessage,
} from "../../validation/ChangePasswordValidation";
import SettingsMenuContext from "../../context/settingsMenu-context";
import { Link } from "react-router-dom";

const ChangePasswordForm = () => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const settingsMenuContext = useContext(SettingsMenuContext);
  const [reauthenticate, setReauthenticate] = useState(false);
  const [reAuthMessage, setReAuthMessage] = useState("");
  const [successReAuth, setSuccessReAuth] = useState(null);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (!userContext.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, userContext.isLoggedIn]);

  const changePasswordHandler = (event) => {
    event.preventDefault();
    const newPasswordInput = newPasswordInputRef.current.value;
    const oldPasswordInput = oldPasswordInputRef.current.value;
    
    updatePassword(auth.currentUser, newPasswordInput)
      .then(() => {
        emptyField(oldPasswordInput, newPasswordInput);
        samePasswordCheck(oldPasswordInput, newPasswordInput);
        setSuccessReAuth(false);
        setPasswordChanged(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setError(true);
        if (error.code) {
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
              setErrMsg("There was an error, please try again");
          }
        } else {
          setErrMsg(validateByErrorMessage(error.message));
        }
      });
  };

  return (
    <Fragment>
      <div className={classes.formContainer}>
        <div className={classes.formHeader}>
          <h2 className={classes.passwordChangeTitle}>Change your password</h2>
          <Link
            onClick={settingsMenuContext.showMenu}
            to="/settings"
            className={classes.goBackButton}
            title="Go Back"
          >
            X
          </Link>
        </div>
        <form
          onSubmit={changePasswordHandler}
          className={classes.passwordChangeForm}
        >
          <label htmlFor="oldPasswordInput">Your current password</label>
          <input
            ref={oldPasswordInputRef}
            id="oldPasswordInput"
            type="password"
          ></input>

          <label htmlFor="newPasswordInput">Your new password</label>
          <input
            ref={newPasswordInputRef}
            id="newPasswordInput"
            type="password"
          ></input>
          <button type="submit">Submit</button>
        </form>
        {successReAuth && <p>{reAuthMessage}</p>}
      </div>
      {passwordChanged && (
        <div className={classes.successMessageContainer}>
          <p>Password Changed!</p>
          <p>You will be redirected to main page in 5 seconds...</p>
        </div>
      )}
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
