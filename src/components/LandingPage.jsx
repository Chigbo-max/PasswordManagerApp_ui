import React from 'react';
import { FiLock, FiGlobe, FiShield } from 'react-icons/fi'; 
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1>Welcome to SafePass</h1>
                    <p>Securely store and manage your passwords with ease.</p>
                    <button onClick={() => window.location.href = '/signup'} className={styles.ctaButton}>
                        Get Started
                    </button>
                </section>
                <section className={styles.features}>
                    <div className={styles.feature}>
                        <FiLock size={40} color="#00aaff" style={{ marginBottom: '1rem' }} />
                        <h3>Secure Storage</h3>
                        <p>Your passwords are encrypted and stored securely.</p>
                    </div>
                    <div className={styles.feature}>
                        <FiGlobe size={40} color="#00aaff" style={{ marginBottom: '1rem' }} />
                        <h3>Easy Access</h3>
                        <p>Access your passwords anytime, anywhere.</p>
                    </div>
                    <div className={styles.feature}>
                        <FiShield size={40} color="#00aaff" style={{ marginBottom: '1rem' }} />
                        <h3>Admin Control</h3>
                        <p>Admins can manage users and ensure security.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;