import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import styles from './passwordStrengthMeter.module.css';

const PasswordStrengthMeter = ({ password = '' }) => {
    const calculateStrength = (pass) => {
        if (!pass) return 0;
        
        let strength = 0;
        if (pass.length >= 8) strength += 1;
        if (pass.length >= 12) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        
        return Math.min(strength, 5);
    };

    const strength = calculateStrength(password);
    const strengthText = [
        'Very Weak',
        'Weak',
        'Moderate',
        'Strong',
        'Very Strong',
        'Excellent'
    ][strength];

    const strengthColors = [
        '#ff4444', 
        '#ffbb33', 
        '#ffbb33',
        '#00C851', 
        '#00C851', 
        '#2ecc71'  
    ];

    const tips = [
        'Use at least 8 characters',
        'Include uppercase letters',
        'Include numbers',
        'Include special characters',
        'Use a passphrase for better security'
    ];

    return (
        <div className={styles.container}>
            <div className={styles.meterContainer}>
                <div className={styles.meter}>
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i}
                            className={styles.meterSegment}
                            style={{
                                backgroundColor: i < strength ? strengthColors[strength] : '#ecf0f1',
                                flex: 1,
                                height: '6px',
                                marginRight: i < 4 ? '4px' : '0',
                                borderRadius: i === 0 ? '3px 0 0 3px' : 
                                             i === 4 ? '0 3px 3px 0' : '0'
                            }}
                        />
                    ))}
                </div>
                <span 
                    className={styles.strengthText}
                    style={{ color: strengthColors[strength] }}
                >
                    {strengthText}
                </span>
            </div>

            <div className={styles.tips}>
                <h4>Tips for stronger passwords:</h4>
                <ul>
                    {tips.map((tip, i) => (
                        <li key={i} className={styles.tipItem}>
                            {i < strength ? (
                                <FaCheckCircle className={styles.checkIcon} />
                            ) : (
                                <FaExclamationTriangle className={styles.warningIcon} />
                            )}
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;