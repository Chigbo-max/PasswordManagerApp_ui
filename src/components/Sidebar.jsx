import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiSave, FiSearch, FiUsers, FiLock, FiTrash2, FiShield, FiLogOut } from 'react-icons/fi'; // Icons for links
import styles from './sidebar.module.css';

const Sidebar = (props) => {
    const { role, userName, isOpen } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
            <div className={styles.userInfo}>
                <h3>{userName || 'User'}</h3>
            </div>
            <ul className={styles.sidebarLinks}>
                {role === 'user' ? (
                    <>
                        <li>
                            <Link to="/account/dashboard">
                                <FiHome className={styles.icon} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/save-credentials">
                                <FiSave className={styles.icon} /> Save Credentials
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/view-credentials">
                                <FiSearch className={styles.icon} /> Find Your Credentials
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                <FiLogOut className={styles.icon} /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/admin/dashboard">
                                <FiHome className={styles.icon} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/suspend-account">
                                <FiLock className={styles.icon} /> Suspend Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/close-account">
                                <FiTrash2 className={styles.icon} /> Close Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/view-audit-logs">
                                <FiSearch className={styles.icon} /> View Audit Logs
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/view-users">
                                <FiUsers className={styles.icon} /> View Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/activate-account">
                                <FiShield className={styles.icon} /> Activate Account
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                <FiLogOut className={styles.icon} /> Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;