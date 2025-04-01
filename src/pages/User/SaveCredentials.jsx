import { useSaveCredentialsMutation } from "../../services/PasswordManagerApi";
import { ClipLoader } from "react-spinners";
import Style from "./savecredentials.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { validatePassword } from "../../reusables/Validator";

const initialFormData = {
    website: "",
    username: "",
    password: ""
};

const SaveCredentials = () => {
    const [saveCredentials, { isLoading, error }] = useSaveCredentialsMutation();
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        if (event.target.name === "password") {
            setPasswordTouched(true);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("access_token");
        if (!token) {
            toast.error("Please log in first!");
            return;
        }

        const passwordValidation = validatePassword(formData.password);
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
            await saveCredentials(formData).unwrap();
            toast.success('Credentials saved successfully!');
            setFormData(initialFormData);
            setPasswordTouched(false);
            setShowPassword(false);
        } catch (error) {
            if (error.status === 401) {
                toast.error("Please log in again.");
            } else {
                toast.error('Failed to save: ' + (error.data?.message || "Please fill in all fields correctly"));
            }
        }
    };

    const passwordValidation = validatePassword(formData.password);
    const isPasswordValid = passwordValidation.isValid || !passwordTouched;

    return (
        <div className={Style.container}>
            <form onSubmit={handleSave} className={Style.form}>
                <h1>Save Your Credentials</h1>

                <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website (e.g., instagram.com)"
                    required
                />

                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Email or Username"
                    required
                />

                <div className={Style.passwordContainer}>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        maxLength={29}
                        className={!isPasswordValid ? Style.passwordError : ''}
                        required
                    />
                    <button
                        type="button"
                        className={Style.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {passwordTouched && !passwordValidation.isValid && (
                    <div className={Style.passwordRequirements}>
                        <p>Password must contain:</p>
                        <ul>
                            {passwordValidation.messages.map((msg, i) => (
                                <li key={i}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    type="submit"
                    className={Style.button}
                    disabled={isLoading}
                >
                    {isLoading ? <ClipLoader color="#4f46e5" size={20} /> : 'Save Credentials'}
                </button>
            </form>
        </div>
    );
};

export default SaveCredentials;