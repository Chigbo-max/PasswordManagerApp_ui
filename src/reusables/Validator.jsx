export const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasValidLength = password.length >= 8 && password.length <= 28;
    
    return {
        isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasValidLength,
        messages: [
            !hasUpperCase && "At least one uppercase letter",
            !hasLowerCase && "At least one lowercase letter",
            !hasNumber && "At least one number",
            !hasSpecialChar && "At least one special character",
            !hasValidLength && "Must be 8-28 characters long"
        ].filter(Boolean)
    };
};