const validateLogin = (enteredCredintals, userCredintals) => {
  if (
    enteredCredintals.username !== userCredintals.username ||
    enteredCredintals.password !== userCredintals.password
  ) {
    return {
      isValid: false,
      type: "danger",
      msg: "Username or password is incorrect",
    };
  } else {
    return {
      isValid: true,
      type: "success",
      msg: "Logged In successfully",
    };
  }
};
export default validateLogin;
