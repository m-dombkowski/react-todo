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

export const samePasswordCheck = (oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    throw new Error("Same password");
  }
};

export const emptyField = (oldPasswordInput, newPasswordInput) => {
  if (oldPasswordInput.length === 0 || newPasswordInput.length === 0) {
    throw new Error("Empty input field");
  }
};

export const validateByErrorMessage = (errorMessage) => {
  let message;
  if (errorMessage === "Empty input field") {
    message = `Input field(s) can't be empty`;
    return message;
  }
  if (errorMessage === "Same password") {
    message = `New password can't be the same as old password`;
    return message;
  }
};
