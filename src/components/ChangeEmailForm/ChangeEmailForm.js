import { Fragment, useContext, useEffect, useRef, useState } from "react";
import classes from "./ChangeEmailForm.module.css";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";
import SettingsMenuContext from "../../context/settingsMenu-context";
import {
  emptyField,
  regexCheck,
  sameEmailCheck,
  validateByErrorMessage,
} from "../../validation/ChangeEmailValidation";

const ChangeEmailForm = () => {
  const emailInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const settingsMenuContext = useContext(SettingsMenuContext);
  const [emailChanged, setEmailChanged] = useState(false);
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

  const changeEmailHandler = (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const loggedEmail = auth.currentUser.email;
    setErrMsg("");
    setSuccessReAuth(false);
    setError(false);

    updateEmail(auth.currentUser, emailInput)
      .then(() => {
        sameEmailCheck(loggedEmail, emailInput);
        emptyField(emailInput);
        regexCheck(emailInput);
        setSuccessReAuth(false);
        setEmailChanged(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        setError(true);

        if (error.code) {
          switch (error.code) {
            case "auth/invalid-email":
              setErrMsg("Invalid Email format");
              break;
            case "auth/email-already-in-use":
              setErrMsg("This email is already taken");
              break;
            case "auth/requires-recent-login":
              setError(false);
              setReauthenticate(true);
              navigate("/settings/email/reauthenticate");
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
        <div>
          <div className={classes.formContainer}>
            <div className={classes.formHeader}>
              <h2 className={classes.emailChangeTitle}>Change your email</h2>
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
              onSubmit={changeEmailHandler}
              className={classes.settingsForm}
            >
              <label className={classes.emailLabel} htmlFor="emailInput">
                Email
              </label>
              <input
                className={classes.emailInput}
                ref={emailInputRef}
                id="emailInput"
                type="text"
                placeholder="example@example.org"
              ></input>

              <button className={classes.changeEmailButton} type="submit">
                Change
              </button>

              {emailChanged && (
                <div className={classes.successMessageContainer}>
                  <p
                    className={classes.successfulMessage}
                  >{`Email address updated!`}</p>
                  <p className={classes.redirectAnnouncement}>
                    {"You will be redirected to main page in 5 seconds..."}
                  </p>
                </div>
              )}
              {error && <p className={classes.errorMessage}>{errMsg}</p>}
            </form>
          </div>
          {successReAuth && (
            <div className={classes.reAuthContainer}>
              <p className={classes.reAuthMessage}>{reAuthMessage}</p>
            </div>
          )}
        </div>
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

export default ChangeEmailForm;
