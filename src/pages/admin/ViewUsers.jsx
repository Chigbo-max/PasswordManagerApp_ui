import React from 'react';
import styles from '../../layout/adminLayout.module.css';
import { useGetUsersQuery } from '../../services/PasswordManagerApi';

const ViewUsers = () => {
    const { data: users, error, isLoading } = useGetUsersQuery();

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div className={styles.error}>Failed to load users: {error.message}</div>;

    return (
        <div className={styles.viewUsers}>
            <h2>View Users</h2>
            {users?.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewUsers;