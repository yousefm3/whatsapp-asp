const validateRegister = (data) => {
  const { username, password, passwordConfirmation, displayName } = data;

  //   Check If One Of The Required Fields Is Missed
  if (!username || !password || !passwordConfirmation || !displayName) {
    return {
      isValid: false,
      type: "danger",
      msg: "Please enter all the required fields to create a user",
    };
  }
  //   Check If UserName Length Is Less Than 3 Characters
  if (username.length < 3) {
    return {
      isValid: false,
      type: "danger",
      msg: "UserName must be at least 3 characters",
    };
  }

  //    Check If Password Is Less Than 8 Characters
  if (password.length < 8) {
    return {
      isValid: false,
      type: "danger",
      msg: "Password must be at least 8 characters",
    };
  }

  //    Check If Password Is Less Than 8 Characters
  if (passwordConfirmation.length < 8) {
    return {
      isValid: false,
      type: "danger",
      msg: "Password confirmation must be at least 8 characters",
    };
  }

  //   Check If Password And Password Confirmation Is Not The Same
  if (passwordConfirmation !== password) {
    return {
      isValid: false,
      type: "danger",
      msg: "Password and password confirmation must be identical",
    };
  }

  //   Check If displayName Is Less Than 4 Characters
  if (displayName.length < 4) {
    return {
      isValid: false,
      type: "danger",
      msg: "Display Name must be at least 4 characters",
    };
  }

  return {
    isValid: true,
    type: "success",
    msg: "User created successfully, Please Login to use the app",
  };
};
export default validateRegister;
