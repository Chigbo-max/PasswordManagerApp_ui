import React from 'react';
import styles from '../../layout/adminLayout.module.css'
import { useGetAuditLogsQuery } from '../../services/PasswordManagerApi';

const ViewAuditLogs = () => {
    const { data: logs, error, isLoading } = useGetAuditLogsQuery();

    if (isLoading) return <div>Loading audit logs...</div>;
    if (error) return <div className={styles.error}>Failed to load audit logs: {error.message}</div>;

    return (
        <div className={styles.viewAuditLogs}>
            <h2>View Audit Logs</h2>
            {logs?.length === 0 ? (
                <p>No audit logs found.</p>
            ) : (
                <table className={styles.logsTable}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.email}</td>
                                <td>{log.action}</td>
                                <td>{log.details}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewAuditLogs;