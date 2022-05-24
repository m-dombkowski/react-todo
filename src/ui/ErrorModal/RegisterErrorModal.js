import classes from "./RegisterErrorModal.module.css";

const RegisterErrorModal = (props) => {
  console.log(props);
  return <p className={classes.errorMessage}>{props.errorMessage}</p>;
};

export default RegisterErrorModal;
