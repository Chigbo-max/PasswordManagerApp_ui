import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            {/* <Navbar /> */}
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
                        <h3>Secure Storage</h3>
                        <p>Your passwords are encrypted and stored securely.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Easy Access</h3>
                        <p>Access your passwords anytime, anywhere.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Admin Control</h3>
                        <p>Admins can manage users and ensure security.</p>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default LandingPage;