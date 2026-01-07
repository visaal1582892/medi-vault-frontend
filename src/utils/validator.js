export const isEmpty = (input) => {
    return input==null || input=="";
}

export const getEmailValidationMessage = (email) => {
    if(email.length<5 || email.length>100) return "Email size must be between 5 and 100";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter valid Email";
    return "";
}

export const getUsernameValidationMessage = (username) => {
    
}

export const validateRegisterData = (registerData) => {
    const errors = {};

}