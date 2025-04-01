import React, { useState } from 'react';
import styles from './dashboard.module.css';
import Sidebar from '../../components/Sidebar';


const Dashboard = () => {
    
    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Manage your credentials securely with SafePass.</p>
        </div>
    );
};

export default Dashboard;