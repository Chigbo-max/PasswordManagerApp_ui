import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import banner from "../assets/safepass.jpg";
import Style from './signUp.module.css';
import Button from "../reusables/Button";
import { useSignUpMutation } from '../services/PasswordManagerApi';
import { ClipLoader } from "react-spinners";

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

        try {
            const response = await signUp(form).unwrap();
            console.log(response);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);

            setSuccessMessage("Sign up successful... redirecting");

            setTimeout(() => {
                response.role === "admin" ? navigate("/admin/dashboard") : navigate("/user/dashboard");
            }, 2000);
        } catch (error) {
            console.log("Sign up unsuccessful:", error);
            setSuccessMessage("");
        }
    };

    return (
        <div className={Style.signUp}>
            <div className={Style.form}>
                <form onSubmit={handleFormSubmit}>
                    <h2>Create your account</h2>
                    <p>It's pretty easy</p>
                    <div className={Style.inputContainer}>
                        <input type="email" placeholder="Type your email address" value={form.email} name="email" onChange={handleFormChange} required/>
                    </div>
                    <div className={Style.inputContainer}>
                        <input type="password" placeholder="Master password" value={form.master_password} name="master_password" onChange={handleFormChange} required/>
                    </div>

                    <div className={Style.buttonContainer}>
                        <Button type="submit" action={isLoading ? <ClipLoader color="#ffff" size={50} /> : "Sign Up"} />
                        {error && <p style={{ color: "red" }}> Sign up failed. Please try again 🙏</p>}
                            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
