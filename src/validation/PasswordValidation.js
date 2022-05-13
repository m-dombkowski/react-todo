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
