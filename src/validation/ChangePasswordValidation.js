export const passwordRegexValidation = (passwordInput) => {
  const regexExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
  if (regexExpression.test(passwordInput)) {
    return true;
  } else {
    throw new Error(
      "Password needs to be at least 7 characters long, contain at least one digit and one uppercase letter"
    );
  }
};

export const validate = (firstInput, secondInput) => {
  if (firstInput.length === 0 || secondInput.length === 0) {
    throw new Error("Empty input field");
  }

  if (firstInput !== secondInput) {
    throw new Error("Different input values");
  }
};

export const validateByErrorMessage = (errorMessage) => {
  let message;
  if (errorMessage === "Different input values") {
    message = "Passwords are not identical";
    return message;
  }
  if (errorMessage === "Empty input field") {
    message = `Input field(s) can't be empty`;
    return message;
  }
  if (errorMessage === "Same password") {
    message = `New password can't be the same as old password`;
    return message;
  }
};
