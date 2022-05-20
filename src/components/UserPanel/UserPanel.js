import { Fragment, useRef } from "react";
import classes from "./UserPanel.module.css";
import { updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";

const UserPanel = () => {
  const emailInputRef = useRef();

  const changeEmailHandler = (event) => {
    event.preventDefault();

    updateEmail(auth.currentUser, emailInputRef.current.value)
      .then(() => {
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
      </form>
    </Fragment>
  );
};

export default UserPanel;
