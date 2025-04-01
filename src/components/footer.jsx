import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </div>
                <div className={styles.socialMedia}>
                    <h3>Follow Us</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://twitter.com"><FontAwesomeIcon icon={faXTwitter} /></a>
                        <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} SafePass. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default footer;