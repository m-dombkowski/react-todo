export const validate = (currentUserEmail, emailInput) => {
  if (emailInput.length === 0) {
    throw new Error("Empty input field");
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(emailInput)) {
    throw new Error("Regex error");
  }

  if (currentUserEmail === emailInput) {
    throw new Error("Same email");
  }
};

export const validateByErrorMessage = (errorMessage) => {
  let message;
  if (errorMessage === "Empty input field") {
    message = `Input field can't be empty`;
    return message;
  }
  if (errorMessage === "Regex error") {
    message = "Invalid Email format";
    return message;
  }
  if (errorMessage === "Same email") {
    message = "New email must be different than your current one";
    return message;
  }
};
