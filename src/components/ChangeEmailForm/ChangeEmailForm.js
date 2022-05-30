import { Fragment, useContext, useEffect, useRef, useState } from "react";
import classes from "./ChangeEmailForm.module.css";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";
import SettingsMenuContext from "../../context/settingsMenu-context";

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

    updateEmail(auth.currentUser, emailInputRef.current.value)
      .then(() => {
        setSuccessReAuth(false);
        setEmailChanged(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        console.log(error.code);
        setError(true);
        switch (error.code) {
          case "auth/invalid-email":
            setErrMsg("Invalid Email, please check email format");
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
            setErrMsg("should not get here, rekt");
        }
      });
  };

  return (
    <Fragment>
      {!reauthenticate && (
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
          <form onSubmit={changeEmailHandler} className={classes.settingsForm}>
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
              <>
                <p
                  className={classes.successfulMessage}
                >{`Email address updated, new email: ${emailInputRef.current.value}  `}</p>
                <p className={classes.redirectAnnouncement}>
                  {"You will be redirected to main page in 5 seconds"}
                </p>
              </>
            )}
          </form>
          {successReAuth && <p>{reAuthMessage}</p>}
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

export default ChangeEmailForm;
