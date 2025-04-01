import React, { useState } from 'react';
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Style from './login.module.css';
import { Link } from 'react-router-dom';
import banner from "../assets/safepass.jpg";
import { useLoginMutation } from "../services/PasswordManagerApi";
import Button from "../reusables/Button";
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Password from "../reusables/Password"
import { validatePassword } from '../reusables/Validator';

function loginPage() {

    const navigate = useNavigate();
    const [logIn, { error, isLoading }] = useLoginMutation();
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        master_password: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const passwordValidation = validatePassword(formData.master_password);
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
            const response = await logIn(formData).unwrap();
            setSuccessMessage("Login Successful");

            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("role", response.role);

            toast.success("Login successful, redirecting to dashboard")

            setTimeout(() => {
                response.role === "admin" ? navigate("/admin/dashboard") : navigate("/account/dashboard");
            }, 2000);
        } catch (error) {
            toast.error('Login unsuccessful: ' + (error.data?.message || 'Login unsuccessful'));
        }
    }




    const handleFormChange = ((event) => {
        (
            setFormData({ ...formData, [event.target.name]: event.target.value })
        )
    })

    return (
        <div className={Style.logIn}>
            <div className={Style.banner}>
                <img src={banner} alt="banner" />

            </div>
            <div className={Style.form}>

                <form onSubmit={handleSubmit}>
                    <h2>Sign into your account</h2>
                    <div className={Style.inputContainer}>
                        <CiMail className={Style.inputIcon} />
                        <input type='email' placeholder='Email address' name="email" value={formData.email} onChange={handleFormChange} required />
                    </div>

                    <Password formData={formData} handleFormChange={handleFormChange} className={Style.inputContainer}/>
                    {/* <div className={Style.inputContainer}>
                        <CiLock className={Style.inputIcon} />
                        <input type={showPassword ? "text" : "password"} className={Style.passwordInput} placeholder='Master password' name="master_password"
                            value={formData.master_password}
                            minLength={8}
                            maxLength={32}
                            pattern=".{8,32}"
                            title="Password must be 8-32 characters long"
                            onChange={handleFormChange} required />
                        <button
                            type="button"
                            className={Style.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>

                    </div> */}
                    <div className={Style.buttonContainer}>
                        <Button disabled={isLoading} type='submit' action={isLoading ? <ClipLoader color="#ffff" size={50} /> : "Login"}></Button>

                        <div className={Style.signUpContainer}>
                            <label>Don't have an account?</label>
                            <Link to="/signUp">Sign Up</Link>
                        </div>
                    </div>
                    <div className={Style.forgetPassword}>
                        <Link to="/forget-password">forget password</Link>
                    </div>
                    {/* {error && <div className={Style.error}><p style={{ color: "red" }} >Login unsuccessful. Please check your email/password</p></div>} */}
                    {/* {error && toast.error("Login unsuccessful. Please check your email/password")} */}
                    {/* {successMessage && <div className={Style.success}>{successMessage}</div>} */}
                    {/* {successMessage && toast.success(successMessage)} */}
                </form>
            </div>

        </div>
    )
}

export default loginPage

