export const isEmpty = (input) => {
    return input==null || input=="";
}

export const isValidEmail = (email) => {
    if(email.length<5 || email.length>100) return false;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return true;
}