import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from './adminLayout.module.css';
import { useGetUserQuery } from '../services/PasswordManagerApi';


const AdminLayout = () => {
    const navigate = useNavigate();
    const { data: userData, error, isLoading } = useGetUserQuery();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading) { 
            if (!localStorage.getItem('access_token') || localStorage.getItem('role') !== 'admin') {
                console.log('UserLayout: Redirecting to /login due to missing token or invalid role');
                navigate('/login');
            }
        }
    }, [isLoading, navigate]); 

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        console.log('API Error:', error);
        if (error.status === 401) {
            console.log('Unauthorized - Redirecting to login');
            localStorage.removeItem('access_token');
            navigate('/login');
            return null;
        }
    }

    const userEmail = userData?.message?.email || 'admin@safepass.com'; 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
      <div className={styles.userLayout}>
          <button
              className={styles.hamburger}
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
          >
              {isSidebarOpen ? '✕' : '☰'}
          </button>
          <div className={styles.layout}>
              <Sidebar
                  role="admin"
                  userName={userEmail}
                  isOpen={isSidebarOpen}
              />
              <main className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
              <div className={styles.contentWrapper}>
                  <Outlet />
                  </div>
              </main>
             
          </div>
      </div>
  );
};

export default AdminLayout;