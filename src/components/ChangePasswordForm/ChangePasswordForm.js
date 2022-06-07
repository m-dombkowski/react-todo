import { Fragment, useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import classes from "./ChangePasswordForm.module.css";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";
import {
  emptyField,
  validateByErrorMessage,
} from "../../validation/ChangePasswordValidation";
import SettingsMenuContext from "../../context/settingsMenu-context";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner/Spinner";

const ChangePasswordForm = () => {
  const newPasswordInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const settingsMenuContext = useContext(SettingsMenuContext);
  const [spinner, setSpinner] = useState(false);
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
    setSpinner(true);
    event.preventDefault();
    const newPasswordInput = newPasswordInputRef.current.value;
    setErrMsg("");
    setSuccessReAuth(false);
    setError(false);
    updatePassword(auth.currentUser, newPasswordInput)
      .then(() => {
        emptyField(newPasswordInput);
        setSpinner(false);
        setSuccessReAuth(false);
        setPasswordChanged(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        setSpinner(false);
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
      {!reauthenticate && (
        <Fragment>
          <div className={classes.formContainer}>
            <div className={classes.formHeader}>
              <h2 className={classes.passwordChangeTitle}>
                Change your password
              </h2>
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
              <label
                className={classes.passwordLabel}
                htmlFor="newPasswordInput"
              >
                Your new password
              </label>
              <input
                ref={newPasswordInputRef}
                id="newPasswordInput"
                type="password"
                className={classes.passwordInput}
              ></input>
              <button className={classes.changePasswordButton} type="submit">
                Submit
              </button>
              {passwordChanged && (
                <div className={classes.successMessageContainer}>
                  <p className={classes.successfulMessage}>Password Changed!</p>
                  <p>You will be redirected to main page in 5 seconds...</p>
                </div>
              )}
              {error && (
                <div className={classes.errorMessageContainer}>
                  {" "}
                  <p className={classes.errorMessage}>{errMsg}</p>
                </div>
              )}
            </form>
            {spinner && (
              <div className={classes.spinnerContainer}>
                <Spinner />
              </div>
            )}
          </div>

          {successReAuth && (
            <div className={classes.reAuthContainer}>
              <p className={classes.reAuthMessage}>{reAuthMessage}</p>
            </div>
          )}
        </Fragment>
      )}
      {reauthenticate && (
        <AuthenticationModal
          showForm={setReauthenticate}
          reAuth={setSuccessReAuth}
          reAuthMessage={setReAuthMessage}
        />
      )}
    </Fragment>
  );
};

export default ChangePasswordForm;
