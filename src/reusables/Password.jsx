import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CiLock } from "react-icons/ci";
import { validatePassword } from './Validator.jsx';
import Style from "./password.module.css";

function Password({ formData, handleFormChange, className, showRequirements = false }) {
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    
    const validation = validatePassword(formData.master_password || '');

    const handleChange = (e) => {
        handleFormChange(e);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    return (
        <div className={`${Style.inputContainer} ${className || ''}`}>
            <CiLock className={Style.inputIcon} />
            <input 
                type={showPassword ? "text" : "password"} 
                className={`${Style.passwordInput} ${
                    touched && !validation.isValid ? Style.inputError : ''
                }`}
                placeholder='Master password' 
                name="master_password"
                value={formData.master_password || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                required 
            />
            <button
                type="button"
                className={Style.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>

            {showRequirements && touched && !validation.isValid && (
                <div className={Style.validationMessages}>
                    {validation.messages.map((msg, i) => (
                        <p key={i} className={Style.validationMessage}>
                            {msg}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Password;