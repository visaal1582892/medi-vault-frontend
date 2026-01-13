export const isEmpty = (input) => {
    return input == 'undefined' || input == undefined || input == null || input == "";
}

export const getEmailValidationMessage = (email) => {
    if (isEmpty(email)) return "Email is empty"
    if (email.length < 5 || email.length > 100) return "Email size must be between 5 and 100";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter valid email";
    return "";
}

export const getUsernameValidationMessage = (username) => {
    if (isEmpty(username)) return "Username cannot be empty"
    if (username.length < 3 || username.length > 100) return "Username size must be between 3 and 100";
    if (!/^(?=.{3,100}$)[a-zA-Z][a-zA-Z0-9._ ]*$/.test(username)) return "Enter vaid username";
    return "";
}

export const getPasswordValidationMessage = (password) => {
    if (isEmpty(password)) return "Password cannot be empty";
    if (password.length < 5 || password.length > 100) return "Password size must be between 3 and 100";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(password)) return "Password must contain upper, lower, number and special character";
    return "";
}

export const getConfirmPasswordMessage = (confirmPassword, password) => {
    if (confirmPassword != password) return "Confirm passowrd must be same as password";
    return "";
}

export const isErrorMessagesEmpty = (fieldErrors) => {
    if (Object.values(fieldErrors).every(err => err == "")) return true;
    return false;
}

export const validateRegisterData = (registerData) => {
    const errors = {};

    errors.verifiedEmail = getEmailValidationMessage(registerData.verifiedEmail);
    errors.username = getUsernameValidationMessage(registerData.username);
    errors.password = getPasswordValidationMessage(registerData.password);
    errors.confirm_password = getConfirmPasswordMessage(
        registerData.confirm_password,
        registerData.password
    );

    if(isErrorMessagesEmpty(errors)) return null;
    return errors;
}
 
export const validateLoginData = (loginData) => {
    const errors = {};
 
    errors.email = getEmailValidationMessage(loginData.email);
    errors.password = getPasswordValidationMessage(loginData.password);

    if(isErrorMessagesEmpty(errors)) return null;
    return errors;
}