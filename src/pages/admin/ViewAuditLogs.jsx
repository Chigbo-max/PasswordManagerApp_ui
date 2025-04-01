import React, { useState } from 'react';
import styles from './viewAuditLogs.module.css';
import { useGetAuditLogsQuery } from '../../services/PasswordManagerApi';
import { FiUser, FiSearch, FiMail, FiActivity, FiInfo, FiSmartphone, FiGlobe, FiClock } from 'react-icons/fi';

const ViewAuditLogs = () => {
    const { data, error, isLoading } = useGetAuditLogsQuery();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = data?.log_list?.filter(log => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            log.user?.toString().toLowerCase().includes(term) ||
            log.email?.toLowerCase().includes(term) ||
            log.action?.toLowerCase().includes(term) ||
            log.details?.toLowerCase().includes(term) ||
            log.device_info?.toLowerCase().includes(term) ||
            log.ip_address?.toLowerCase().includes(term) ||
            new Date(log.timestamp).toLocaleString().toLowerCase().includes(term)
        );
    });

    const getActionColor = (action) => {
        switch(action.toLowerCase()) {
            case 'login': return '#10b981';
            case 'password reset': return '#3b82f6';
            case 'delete': return '#ef4444';
            case 'update': return '#f59e0b';
            case 'reset link': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    if (isLoading) return (
        <div className={styles.viewAuditLogs}>
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading audit logs...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.viewAuditLogs}>
            <div className={styles.error}>Failed to load audit logs: {error.message}</div>
        </div>
    );

    return (
        <div className={styles.viewAuditLogs}>
            <div className={styles.headerContainer}>
                <h2>SafePass Audit-Logs</h2>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {filteredLogs?.length === 0 ? (
                <p>{searchTerm ? 'No matching log found' : 'No audit log found.'}</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.logsTable}>
                        <thead>
                            <tr>
                                <th><FiMail className={styles.icon} /> Email</th>
                                <th><FiActivity className={styles.icon} /> Action</th>
                                <th><FiInfo className={styles.icon} /> Details</th>
                                <th><FiSmartphone className={styles.icon} /> Device</th>
                                <th><FiGlobe className={styles.icon} /> IP Address</th>
                                <th><FiClock className={styles.icon} /> Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs?.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.email}</td>
                                    <td>
                                        <span 
                                            className={styles.actionBadge}
                                            style={{ backgroundColor: getActionColor(log.action) }}
                                        >
                                            {log.action}
                                        </span>
                                    </td>
                                    <td>{log.details}</td>
                                    <td>{log.device_info}</td>
                                    <td>{log.ip_address}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewAuditLogs;