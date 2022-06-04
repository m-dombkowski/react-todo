import { useContext } from "react";
import UserContext from "../../context/user-context";
import classes from "./SignedUser.module.css";

const SignedUser = () => {
  const userContext = useContext(UserContext);

  const isLoggedIn = userContext.isLoggedIn;

  return (
    <div className={classes.info}>
      {isLoggedIn ? "Signed in!" : "Not signed in"}
    </div>
  );
};
export default SignedUser;
