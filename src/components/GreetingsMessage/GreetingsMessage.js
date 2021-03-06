import { Link } from "react-router-dom";
import firebaseDark from "../../assets/firebaseDark.svg";

import classes from "./GreetingsMessage.module.css";

const GreetingsMessage = () => {
  return (
    <div className={classes.welcomePage}>
      <h1 className={classes.title}>Hey!</h1>
      <div className={classes.messageContainer}>
        <p className={classes.mainMessage}>
          {" "}
          This simple calendar app is my first{" "}
          <a
            className={classes.reactAnchor}
            href="https://reactjs.org/"
            target="_blank"
            rel="noreferrer"
          >
            React.js
          </a>{" "}
          project. In order to get access to it's features you need to create
          account (credentials don't need to be real). After registering and
          logging in you will get access to your own personal calendar in which
          you can add your own events. I used{" "}
          <a
            className={classes.calendarAnchor}
            href="https://fullcalendar.io/"
            target="_blank"
            rel="noreferrer"
          >
            Fullcalendar.io
          </a>{" "}
          library for a calendar, and{" "}
          <a
            className={classes.firebaseAnchor}
            href="https://firebase.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Firebase
          </a>{" "}
          for storing data and authentication so feel free to check them out!
        </p>

        <p className={classes.thanksMessage}>
          Thanks for checking out my app, hope you enjoy it ;).{" "}
        </p>
      </div>
      <div className={classes.loginButtonContainer}>
        <Link to="/login" className={classes.login}>
          Login
        </Link>
      </div>
      <img
        className={classes.firebaseLogo}
        src={firebaseDark}
        alt="dark firebase svg icon"
      />
    </div>
  );
};

export default GreetingsMessage;
