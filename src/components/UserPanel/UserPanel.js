import { Fragment, useContext, useEffect, useRef, useState } from "react";
import classes from "./UserPanel.module.css";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import AuthenticationModal from "../ReAuthenticateUserModal/AuthenticationModal";

const UserPanel = () => {
  const emailInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [emailChanged, setEmailChanged] = useState(false);
  const [reauthenticate, setReauthenticate] = useState(false);
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
          case "auth/requires-recent-login":
            setError(false);
            setReauthenticate(true);
            navigate("/settings/reauthenticate");
            break;
          default:
            setErrMsg("should not get here, rekt");
        }
      });
  };

  return (
    <Fragment>
      <form onSubmit={changeEmailHandler} className={classes.settingsForm}>
        <label htmlFor="emailInput">Change your email</label>
        <input ref={emailInputRef} id="emailInput" type="text"></input>
        <button type="submit">Submit</button>
        {emailChanged && (
          <>
            <p>{`Email address updated, new email: ${emailInputRef.current.value}  `}</p>
            <p>{"You will be redirected to main page in 5 seconds"}</p>
          </>
        )}
      </form>

      {reauthenticate && <AuthenticationModal />}
      {error && <p>{errMsg}</p>}
    </Fragment>
  );
};

export default UserPanel;