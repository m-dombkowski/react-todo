import { Fragment, useContext } from "react";
import UserContext from "../../context/user-context";
import { getAuth, signOut } from "firebase/auth";
import classes from "./LogoutButton.module.css";

const LogoutButton = () => {
  const userContext = useContext(UserContext);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        userContext.isLoggedIn = false;
      })
      .catch((error) => {});
  };

  return (
    <Fragment>
      <button className={classes.logout} onClick={logoutHandler}>
        Logout
      </button>
    </Fragment>
  );
};

export default LogoutButton;
