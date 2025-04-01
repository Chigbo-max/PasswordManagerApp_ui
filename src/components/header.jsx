import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import Logo from './logo';

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
                <Link className={styles.logolink}to="/">
                <Logo/>
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