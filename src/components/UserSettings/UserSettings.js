import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import SettingsMenuContext from "../../context/settingsMenu-context";
import classes from "./UserSettings.module.css";
import password from "../../assets/password.svg";
import email from "../../assets/email.svg";

const UserSettings = () => {
  const menuContext = useContext(SettingsMenuContext);

  return (
    <Fragment>
      {menuContext.menuVisible && (
        <div className={classes.linksContainer}>
          <Link
            className={classes.emailLink}
            onClick={menuContext.hideMenu}
            to="email"
          >
            {" "}
            <div className={classes.emailLinkContainer}>
              <img className={classes.emailSvg} src={email} alt="email icon" />
              <p className={classes.emailLinkText}>Change Email</p>
            </div>
          </Link>

          <Link
            className={classes.passwordLink}
            onClick={menuContext.hideMenu}
            to="password"
          >
            <div className={classes.passwordLinkContainer}>
              <img
                className={classes.passwordSvg}
                src={password}
                alt="lock icon"
              />
              <p className={classes.passwordLinkText}>Change Password</p>
            </div>
          </Link>
        </div>
      )}
      <Outlet />
    </Fragment>
  );
};

export default UserSettings;
