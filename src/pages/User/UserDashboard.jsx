import styles from "./userDashboard.module.css"

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Sidebar from '../../components/Sidebar';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'user') {
            navigate('/login');
        }

    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch('/api/account', {
    //                 headers: { 'Authorization': `Bearer ${token}` },
    //             });
    //             const data = await response.json();
    //             setUserName(data.name || 'User'); 
    //         } catch (error) {
    //             console.error('Failed to fetch user data:', error);
    //             navigate('/login');
    //         }
    //     };
    //     fetchUserData();
    // }, [navigate]);

    })
    return (
        <div className={styles.userDashboard}>
            {/* <Navbar /> */}
            <div className={styles.layout}>
                <Sidebar role="user" userName={userName} />
                <main className={styles.mainContent}>
                    <Outlet /> {/* Renders child routes like Dashboard, SaveCredentials, etc. */}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
