import React, { useState } from 'react';
import styles from './accountManagement.module.css';
import { useCloseAccountMutation } from '../../services/PasswordManagerApi';
import { toast } from 'react-toastify';
import { FiMail, FiXCircle } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

const CloseAccount = () => {
    const [email, setEmail] = useState('');
    const [closeAccount, { isLoading }] = useCloseAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await closeAccount({ email }).unwrap();
            toast.success(response.message);
            setEmail('');
        } catch (err) {
            toast.error(err.data?.message || 'Failed to close account');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <FiXCircle className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Close Account</h2>
                <p className={styles.cardSubtitle}>Permanently delete a user's account</p>
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
                    className={`${styles.submitButton} ${styles.dangerButton}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={18} />
                    ) : (
                        'Close Account'
                    )}
                </button>
            </form>
        </div>
    );
};

export default CloseAccount;