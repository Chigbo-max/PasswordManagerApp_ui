import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = (props) => {

    const {role, userName, isOpen} = props;

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
            <div className={styles.userInfo}>
                <h3>Welcome, {userName || 'User'}</h3>
            </div>
            <ul className={styles.sidebarLinks}>
                {role === 'user' ? (
                    <>
                        <li><Link to="/account/dashboard">Dashboard</Link></li>
                        <li><Link to="/account/save-credentials">Save Credentials</Link></li>
                        <li><Link to="/account/view-credentials">View Credentials</Link></li>
                        <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li><Link to="/admin/suspend-account">Suspend Account</Link></li>
                        <li><Link to="/admin/close-account">Close Account</Link></li>
                        <li><Link to="/admin/view-audit-logs">View Audit Logs</Link></li>
                        <li><Link to="/admin/view-users">View Users</Link></li>
                        <li><Link to="/admin/activate-account">Activate Account</Link></li>
                        <li><button onClick={handleLogout} className={styles.logoutBtn}>Logout</button></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;