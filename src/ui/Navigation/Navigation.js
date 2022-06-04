import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import SignedUser from "../../components/SignedUser/SignedUser";
import SettingsMenuContext from "../../context/settingsMenu-context";
import UserContext from "../../context/user-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.isLoggedIn;
  const menuContext = useContext(SettingsMenuContext);
  const showMenu = menuContext.showMenu;

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={classes.naviMain}
              onClick={userContext.showFooter}
              to="/"
            >
              Main
            </NavLink>
          </li>
          <li>
            <SignedUser />
          </li>

          <div className={classes.userControlContainer}>
            <div>
              {isLoggedIn && (
                <NavLink
                  onClick={showMenu}
                  className={classes.settings}
                  to="/settings"
                >
                  {" "}
                  Settings{" "}
                </NavLink>
              )}
            </div>
            <div>
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <li>
                  <NavLink
                    className={classes.login}
                    onClick={userContext.hideFooter}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
