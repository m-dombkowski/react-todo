import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.textContainer}>
        <h2 className={classes.title}> Oops!</h2>
        <h2 className={classes.code}>404</h2>
        <p className={classes.mainMessage}>
          Looks like page you were looking for doesn't exist!
        </p>
        <p className={classes.informationMessage}>
          Please go back to the main page
        </p>
      </div>
    </div>
  );
};

export default NotFound;
