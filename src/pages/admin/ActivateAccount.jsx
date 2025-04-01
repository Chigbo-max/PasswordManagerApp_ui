import React, { useState } from 'react';
import styles from '../../layout/adminLayout.module.css';
import { useActivateAccountMutation } from '../../services/PasswordManagerApi';

const ActivateAccount = () => {
    const [email, setEmail] = useState('');
    const [activateAccount, { isLoading, error }] = useActivateAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await activateAccount({ email }).unwrap();
            alert(response.message);
            setEmail('');
        } catch (err) {
            console.error('Failed to activate account:', err);
        }
    };

    return (
        <div className={styles.activateAccount}>
            <h2>Activate Account</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Activating...' : 'Activate Account'}
                </button>
                {error && <p className={styles.error}>Failed to activate account: {error.message}</p>}
            </form>
        </div>
    );
};

export default ActivateAccount;