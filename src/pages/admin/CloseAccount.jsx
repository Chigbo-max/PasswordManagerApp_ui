import React, { useState } from 'react';
import styles from '../../layout/adminLayout.module.css'; 
import { useCloseAccountMutation } from '../../services/PasswordManagerApi';

const CloseAccount = () => {
    const [email, setEmail] = useState('');
    const [closeAccount, { isLoading, error }] = useCloseAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await closeAccount({ email }).unwrap();
            alert(response.message);
            setEmail('');
        } catch (err) {
            console.error('Failed to close account:', err);
        }
    };

    return (
        <div className={styles.closeAccount}>
            <h2>Close Account</h2>
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
                    {isLoading ? 'Closing...' : 'Close Account'}
                </button>
                {error && <p className={styles.error}>Failed to close account: {error.message}</p>}
            </form>
        </div>
    );
};

export default CloseAccount;