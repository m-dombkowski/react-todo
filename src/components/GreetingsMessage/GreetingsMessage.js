import { Link } from "react-router-dom";

import classes from "./GreetingsMessage.module.css";

const GreetingsMessage = () => {
  return (
    <div className={classes.welcomePage}>
      <h1 className={classes.title}>Hello</h1>
      <Link to="/login" className={classes.login}>
        Login
      </Link>
    </div>
  );
};

export default GreetingsMessage;
