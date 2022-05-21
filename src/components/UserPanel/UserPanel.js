import { Fragment, useContext, useEffect, useRef, useState } from "react";
import classes from "./UserPanel.module.css";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";

const UserPanel = () => {
  const emailInputRef = useRef();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [emailChanged, setEmailChanged] = useState(false);

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
        console.log(
          `Email address updated, new email ${emailInputRef.current.value}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <form onSubmit={changeEmailHandler} className={classes.settingsForm}>
        <label htmlFor="emailInput">Change your email</label>
        <input ref={emailInputRef} id="emailInput" type="text"></input>
        <button type="submit">Submit</button>
        {emailChanged && (
          <p>{`Email address updated, new email: ${emailInputRef.current.value}`}</p>
        )}
      </form>
    </Fragment>
  );
};

export default UserPanel;
