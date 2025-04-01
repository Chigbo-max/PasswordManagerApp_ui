import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../assets/safepass.jpg';

const header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="SafePass Logo" />
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Contact</Link></li>
                {token ? (
                    <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
                ) : (
                    <li><Link to="/signup">Sign Up</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default header;