import { useContext } from "react";
import UserContext from "../../context/user-context";

const SignedUser = () => {
  const userContext = useContext(UserContext);

  const isLoggedIn = userContext.isLoggedIn;

  return <div>{isLoggedIn ? "Signed in!" : "Not signed in"}</div>;
};
export default SignedUser;
