import React, { useState } from 'react';
import styles from './viewUsers.module.css';
import { useGetUsersQuery } from '../../services/PasswordManagerApi';
import { FiMail, FiUser, FiShield, FiClock, FiSearch } from 'react-icons/fi';

const ViewUsers = () => {
    const { data, error, isLoading } = useGetUsersQuery();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = data?.message?.filter(user => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            user.email?.toLowerCase().includes(term) ||
            user.role?.toLowerCase().includes(term) ||
            user.status?.toLowerCase().includes(term) ||
            user.created_at?.toLowerCase().includes(term)
        );
    });

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return styles.activeStatus;
            case 'suspended':
                return styles.suspendedStatus;
            case 'deactivated':
                return styles.deactivatedStatus;
            default:
                return styles.defaultStatus;
        }
    };

    if (isLoading) return (
        <div className={styles.viewUsers}>
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading users...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.viewUsers}>
            <div className={styles.error}>Failed to load users: {error.message}</div>
        </div>
    );

    return (
        <div className={styles.viewUsers}>
            <div className={styles.headerContainer}>
                <h2><span>SafePass</span> Clients</h2>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {filteredUsers?.length === 0 ? (
                <p>{searchTerm ? 'No matching users found' : 'No users found.'}</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.usersTable}>
                        <thead>
                            <tr>
                                <th><FiMail className={styles.icon} /> Email</th>
                                <th><FiUser className={styles.icon} /> Role</th>
                                <th><FiShield className={styles.icon} /> Status</th>
                                <th><FiClock className={styles.icon} /> Created Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${getStatusStyle(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewUsers;