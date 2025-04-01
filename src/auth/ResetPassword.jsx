import React, {useState} from 'react';
import Style from "./resetpassword.module.css";
import {useResetPasswordConfirmMutation} from "../services/PasswordManagerApi";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import Button from "../reusables/Button";
import Password from "../reusables/Password"
import { validatePassword } from '../reusables/Validator';


function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token")
  const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordConfirmMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordValidation = validatePassword(newPassword);

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

    try{
      await resetPassword({reset_token: token, new_password: newPassword}).unwrap()
      toast.success("Password reset successful, redirecting to login page")
      setNewPassword("")
      setTimeout(()=>{
        navigate("/login")
      }, 2000);
    }catch (error){
      toast.error("Failed to reset password, please try again", error)
      // setNewPassword("")
    }
  };

  if(!token){
    return (
      <div className={Style.container}>
        <p className={`${Style.statusMessage} ${Style.statusMessageError}`} >Invalid or missing reset token. Please request a new reset link</p>
      </div>
    );

  }

  const handleChange=(event)=>{
    setNewPassword(event.target.value)
  }

  return (
    <div className={Style.container}>
      <h2 className={Style.heading}>Reset Password</h2>

      <form onSubmit={handleSubmit} className={Style.form}>
        <div className={Style.formGroup}>
          <label htmlFor="newPassword">New Password</label>
          <Password formData={newPassword} handleFormChange={handleChange} className={Style.input}/>

          {/* <input type="password"
           id="newPassword"
           value={newPassword}
           minLength={8}
           maxLength={32}
           pattern=".{8,32}"
           title="Password must be 8-32 characters long"
          onChange={handleChange}
          className={Style.input} required 
          /> */}
        </div>

    


        <Button type="submit"
         className={Style.button}
        disabled={isLoading} action={isLoading ? <ClipLoader color= "#36d7b7" size={50} /> : 'Reset Password'}>
        </Button>
         </form>

         {isSuccess && (
          <p className={`${Style.statusMessage} ${Style.statusMessageSuccess}`}>Password reset successful! Redirecting to login...
          </p>
          )}

          {error && (
          <p className={`${Style.statusMessage} ${Style.statusMessageError}`}>
            {error.data?.message || "Failed to reset password. Please try again."}
            </p>
          )}
      
    </div>
  );
};

export default ResetPassword
