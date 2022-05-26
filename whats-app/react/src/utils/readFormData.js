const readFormData = (form, isLoginForm = false) => {
  const formData = new FormData(form.target);
  const formObject = Object.fromEntries(formData.entries());

  // Get The Image File
  if (isLoginForm) return formObject;

  const avatar = [...form.target][4]?.files[0];
  return { ...formObject, avatar: avatar || null };
};

export default readFormData;
