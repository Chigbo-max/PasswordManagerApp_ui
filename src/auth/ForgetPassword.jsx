import React, { useState } from 'react'
import Style from "./forgetpassword.module.css"
import {useForgetPasswordMutation} from "../services/PasswordManagerApi"
import { toast } from 'react-toastify';
import Button from "../reusables/Button"
import { ClipLoader } from 'react-spinners';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [forgetPassword, {isLoading, error}] = useForgetPasswordMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email) {
            try {
                await forgetPassword({email}).unwrap();
                toast.success("Reset password link sent to your email address");
                setEmail("");
            } catch (error) {
                toast.error('Failed to send reset link: ' + (error.data?.message || 'Failed to send reset password link. Please try again.'));
            }
        }
    };
  return (
    <div className={Style.container}>
        <h2 className={Style.heading}>Forgot Password?</h2>
        <p>No worries...</p>
        <form className={Style.form} onSubmit={handleSubmit}>
        <div className={Style.formGroup}>
        <input type = "email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder= "Enter your email"
        required
        />
        </div>
        <Button type="submit" className={Style.button}
                 disabled={isLoading} action={isLoading ? <ClipLoader color="#ffff" size={50} /> : 'Request Reset Link'}>
                 </Button>
        </form>

      

        {
            error && (
                <p className={`${Style.statusMessage} ${Style.statusMessageError}`}>
                    {error.data?.message || "Failed to send reset email. Please try again"}</p>
            )
        }
      
    </div>
  )
}

export default ForgetPassword
