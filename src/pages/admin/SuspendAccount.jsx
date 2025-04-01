import React, { useState } from 'react';
import styles from '../../layout/adminLayout.module.css'; 
import { useSuspendAccountMutation } from '../../services/PasswordManagerApi';

const SuspendAccount = () => {
    const [email, setEmail] = useState('');
    const [suspendAccount, { isLoading, error }] = useSuspendAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await suspendAccount({ email }).unwrap();
            alert(response.message);
            setEmail('');
        } catch (err) {
            console.error('Failed to suspend account:', err);
        }
    };

    return (
        <div className={styles.suspendAccount}>
            <h2>Suspend Account</h2>
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
                    {isLoading ? 'Suspending...' : 'Suspend Account'}
                </button>
                {error && <p className={styles.error}>Failed to suspend account: {error.message}</p>}
            </form>
        </div>
    );
};

export default SuspendAccount;