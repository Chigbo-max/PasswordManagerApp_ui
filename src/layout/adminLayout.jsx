import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styles from './adminLayout.module.css';
import { useGetUserQuery } from '../services/PasswordManagerApi';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { data: userData, error, isLoading } = useGetUserQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error || !localStorage.getItem('access_token') || localStorage.getItem('role') !== 'admin') {
        navigate('/login');
        return null;
    }

    return (
        <div className={styles.adminLayout}>
            {/* <Navbar /> */}
            <div className={styles.layout}>
                <Sidebar role="admin" userName={userData?.name} />
                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;