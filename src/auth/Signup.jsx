import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import banner from "../assets/safepass.jpg";
import Style from './signUp.module.css';
import Button from "../reusables/Button";
import { useSignUpMutation } from '../services/PasswordManagerApi';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Password from "../reusables/Password"
import { validatePassword } from "../reusables/Validator"


function SignUp() {
    const navigate = useNavigate();
    const [signUp, { error, isLoading }] = useSignUpMutation();
    const [successMessage, setSuccessMessage] = useState("");
    const [form, setForm] = useState({
        email: "",
        master_password: "",
    });

    const handleFormChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const passwordValidation = validatePassword(form.master_password); 
        if (!passwordValidation.isValid) {
            toast.error(
                <div>
                    <strong>Password requirements:</strong>
                    <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                        {passwordValidation.messages.map((msg, i) => (
                            <li key={i}>{msg}</li>
                        ))}
                    </ul>
                </div>,
                { autoClose: 5000 }
            );
            return;
        }

        try {
            const response = await signUp(form).unwrap();

            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("role", response.role);
            toast.success("Sign up successful... redirecting")
            setTimeout(() => {
                response.role === "admin" ? navigate("/admin/dashboard") : navigate("/account/dashboard");
            }, 2000);
        } catch (error) {
                toast.error('Sign up unsuccessful: ' + (error.data?.message || 'Sign up unsuccessful'));

        }
    };

    return (
        <div className={Style.signUp}>
            <div className={Style.form}>
                <form onSubmit={handleFormSubmit}>
                    <h2>Create your account</h2>
                    <p>It's pretty easy</p>
                    <div className={Style.inputContainer}>
                        <input type="email" placeholder="Type your email address" value={form.email} name="email" onChange={handleFormChange} required />
                        <Password formData={form} handleFormChange={handleFormChange} className={Style.inputContainer} />
                    </div>

                    <div className={Style.buttonContainer}>
                        <Button type="submit" action={isLoading ? <ClipLoader color="#ffff" size={50} /> : "Sign Up"} />
                        {/* {error && <p style={{ color: "red" }}> {error?.message}</p>} */}
                        {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} */}
                        <div className={Style.orSeparator}>
                        </div>

                    </div>
                    <div className={Style.loginContainer}>
                        <label>Already have an account?</label>
                        <Link to="/login" >Login</Link>
                    </div>
                </form>
            </div>


            <div className={Style.banner}>
                <img src={banner} alt="banner" />
            </div>
        </div>
    );
}

export default SignUp;
