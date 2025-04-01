import React, { useState } from 'react';
import styles from './dashboard.module.css';


const Dashboard = () => {
    
    return (
        <div className={styles.dashboard}>
            <h2>Welcome back!</h2>
            <p>Manage your credentials securely with SafePass.</p>
        </div>
    );
};

export default Dashboard;































// import React, { useState, useEffect } from 'react';
// import styles from './dashboard.module.css';
// import { FaShieldAlt, FaKey, FaClock, FaChartLine, FaBell } from 'react-icons/fa';
// import {RiLockPasswordFill}  from 'react-icons/ri';
// import { toast } from 'react-toastify';
// import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
// import SecurityTipsCarousel from '../../components/SecurityTipsCarousel';
// import CredentialChart from '../../components/CredentialChart';

// const Dashboard = () => {
//     const [stats, setStats] = useState({
//         totalCredentials: 0,
//         weakPasswords: 0,
//         recentActivity: []
//     });
//     const [isLoading, setIsLoading] = useState(true);
    
//     // Simulate data fetching
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             // In a real app, you would fetch this from your API
//             setTimeout(() => {
//                 setStats({
//                     totalCredentials: 24,
//                     weakPasswords: 3,
//                     recentActivity: [
//                         { id: 1, action: 'Updated', site: 'facebook.com', time: '2 hours ago' },
//                         { id: 2, action: 'Added', site: 'netflix.com', time: '1 day ago' },
//                         { id: 3, action: 'Viewed', site: 'bankofamerica.com', time: '3 days ago' }
//                     ]
//                 });
//                 setIsLoading(false);
//             }, 1000);
//         };
        
//         fetchData();
//     }, []);

//     return (
//         <div className={styles.dashboardLayout}>
            
//             <main className={styles.mainContent}>
//                 <header className={styles.dashboardHeader}>
//                     <h1>Welcome back!</h1>
//                     <p>Here's what's happening with your credentials</p>
//                 </header>

//                 {isLoading ? (
//                     <div className={styles.loadingIndicator}>
//                         <div className={styles.spinner}></div>
//                         <p>Loading your dashboard...</p>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Stats Cards */}
//                         <div className={styles.statsGrid}>
//                             <div className={`${styles.statCard} ${styles.primary}`}>
//                                 <div className={styles.statIcon}>
//                                     <RiLockPasswordFill />
//                                 </div>
//                                 <div className={styles.statContent}>
//                                     <h3>{stats.totalCredentials}</h3>
//                                     <p>Saved Credentials</p>
//                                 </div>
//                             </div>

//                             <div className={`${styles.statCard} ${styles.warning}`}>
//                                 <div className={styles.statIcon}>
//                                     <FaShieldAlt />
//                                 </div>
//                                 <div className={styles.statContent}>
//                                     <h3>{stats.weakPasswords}</h3>
//                                     <p>Weak Passwords</p>
//                                 </div>
//                             </div>

//                             <div className={`${styles.statCard} ${styles.success}`}>
//                                 <div className={styles.statIcon}>
//                                     <FaClock />
//                                 </div>
//                                 <div className={styles.statContent}>
//                                     <h3>{stats.recentActivity.length}</h3>
//                                     <p>Recent Activities</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className={styles.contentGrid}>
//                             {/* Recent Activity */}
//                             <div className={styles.activityCard}>
//                                 <div className={styles.cardHeader}>
//                                     <h3><FaBell /> Recent Activity</h3>
//                                 </div>
//                                 <ul className={styles.activityList}>
//                                     {stats.recentActivity.map(activity => (
//                                         <li key={activity.id} className={styles.activityItem}>
//                                             <span className={styles.activityAction}>{activity.action}</span>
//                                             <span className={styles.activitySite}>{activity.site}</span>
//                                             <span className={styles.activityTime}>{activity.time}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* Password Health */}
//                             <div className={styles.healthCard}>
//                                 <div className={styles.cardHeader}>
//                                     <h3><FaChartLine /> Password Health</h3>
//                                 </div>
//                                 <div className={styles.chartContainer}>
//                                     <CredentialChart weak={stats.weakPasswords} strong={stats.totalCredentials - stats.weakPasswords} />
//                                 </div>
//                                 <PasswordStrengthMeter />
//                             </div>

//                             {/* Security Tips */}
//                             <div className={styles.tipsCard}>
//                                 <div className={styles.cardHeader}>
//                                     <h3><FaShieldAlt /> Security Tips</h3>
//                                 </div>
//                                 <SecurityTipsCarousel />
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Dashboard;