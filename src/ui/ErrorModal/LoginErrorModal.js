import classes from "./LoginErrorModal.module.css";

const LoginErrorModal = (props) => {
  return <p className={classes.errorMessage}>{props.error}</p>;
};

export default LoginErrorModal;
