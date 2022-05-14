import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import SignedUser from "../../components/SignedUser/SignedUser";
import UserContext from "../../context/user-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.isLoggedIn;

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink className={classes.naviMain} to="/">
              Main
            </NavLink>
          </li>
          <li>
            <SignedUser />
          </li>

          <div>
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <li>
                <NavLink className={classes.login} to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
