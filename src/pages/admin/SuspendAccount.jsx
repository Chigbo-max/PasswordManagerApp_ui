import React, { useState } from 'react';
import styles from './accountManagement.module.css';
import { useSuspendAccountMutation } from '../../services/PasswordManagerApi';
import { toast } from 'react-toastify';
import { FiMail, FiPauseCircle } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

const SuspendAccount = () => {
    const [email, setEmail] = useState('');
    const [suspendAccount, { isLoading }] = useSuspendAccountMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await suspendAccount({ email }).unwrap();
            toast.success(response.message);
            setEmail('');
        } catch (err) {
            toast.error(err.data?.message || 'Failed to suspend account');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <FiPauseCircle className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Suspend Account</h2>
                <p className={styles.cardSubtitle}>Temporarily restrict a user's access</p>
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
                    className={`${styles.submitButton} ${styles.warningButton}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={18} />
                    ) : (
                        'Suspend Account'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SuspendAccount;