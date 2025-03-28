
import { useSaveCredentialsMutation } from "../services/PasswordManagerApi";
import { ClipLoader } from "react-spinners";
import Button from "../reusables/Button";
import Style from "./savecredentials.module.css";


const SaveCredentials = () => {
    const [saveCredentials, { isLoading, error }] = useSaveCredentialsMutation();
    const [formData, setFormData] = useState({
        website: '',
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleSave = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in first!");
            return;
        }
        try {
           await saveCredentials(formData).unwrap();
            alert('Credentials saved successfully!');
            setFormData({})

        } catch (error) {
            alert('Failed to save: ' + (error.data?.message || error.message));

        }
    };
    return (
        <div className={Style.container}>
            <form onSubmit={handleSave} className={Style.form}>
                <h1>Save Credentials</h1>

                <input value={website}
                    onChange={handleChange}
                    placeholder="Website (e.g.. instagram.com)"
                />

                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Email or Username"


                />
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    type="password"
                />

                <Button type="submit" onClick={handleSave} className={Style.button}
                 disabled={isLoading} action={isLoading ? <ClipLoader color="#ffff" size={50} /> : 'Save Credentials'}>
                 </Button>
                {error && <p>Error: {error.data?.message}</p>}

            </form>
        </div>
    )
}


export default SaveCredentials;