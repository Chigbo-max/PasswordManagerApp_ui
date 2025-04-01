import React, { useState } from 'react';
import styles from './accountManagement.module.css';
import { useActivateAccountMutation } from '../../services/PasswordManagerApi';
import { toast } from 'react-toastify';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

const ActivateAccount = () => {
    const [email, setEmail] = useState('');
    const [activateAccount, { isLoading }] = useActivateAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await activateAccount({ email }).unwrap();
            toast.success(response.message);
            setEmail('');
        } catch (err) {
            toast.error(err.data?.message || 'Failed to activate account');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <FiCheckCircle className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Activate Account</h2>
                <p className={styles.cardSubtitle}>Reactivate a user's access to SafePass</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <FiMail className={styles.inputIcon} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter user's email"
                        required
                        className={styles.input}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={18} />
                    ) : (
                        'Activate Account'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ActivateAccount;