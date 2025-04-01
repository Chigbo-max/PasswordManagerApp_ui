import React, { useEffect, useState } from 'react';
import { 
    useGetCredentialsQuery,
    useDeleteCredentialsMutation,
    useUpdateCredentialsMutation 
} from '../../services/PasswordManagerApi';
import { toast } from 'react-toastify';
import { FiKey, FiFolder, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styles from "./viewcredentials.module.css";
import { validatePassword } from '../../reusables/Validator';

Modal.setAppElement('#root');

const ViewCredentials = () => {
    const { data, error, isLoading, isError, refetch } = useGetCredentialsQuery();
    const [deleteCredentials] = useDeleteCredentialsMutation();
    const [updateCredentials] = useUpdateCredentialsMutation();
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [editingCredential, setEditingCredential] = useState(null);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editFormData, setEditFormData] = useState({
        master_password: '',
        new_website: '',
        new_username: '',
        new_password: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const navigate = useNavigate();

    const filteredCredentials = data?.credentials?.filter(cred => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            cred.website?.toLowerCase().includes(term) ||
            cred.username?.toLowerCase().includes(term) ||
            (visiblePasswords[cred.website] && cred.password?.toLowerCase().includes(term))
        );
    });

    useEffect(() => {
        if (isError) {
            toast.error(`Failed to load credentials: ${error?.data?.message || error.message}`);
        }
    }, [isError, error]);

    const togglePasswordVisibility = (website) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [website]: !prev[website]
        }));
    };

    const handleDelete = async (website) => {
        setDeleteConfirm(website);
    };

    const confirmDelete = async () => {
        try {
            await deleteCredentials(deleteConfirm).unwrap();
            toast.success('Credentials deleted successfully');
            refetch();
        } catch (err) {
            toast.error(`Failed to delete: ${err.data?.message || err.message}`);
        } finally {
            setDeleteConfirm(null);
        }
    };

    const handleEdit = (credential) => {
        setEditingCredential(credential);
        setEditFormData({
            master_password: '',
            new_website: credential.website,
            new_username: credential.username,
            new_password: ''
        });
        setIsModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'new_password') {
            setPasswordTouched(true);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!editFormData.master_password) {
            toast.error('Master password is required');
            return;
        }

        if (editFormData.new_password) {
            const passwordValidation = validatePassword(editFormData.new_password);
            if (!passwordValidation.isValid) {
                toast.error(
                    <div>
                        <strong>Password requirements:</strong>
                        <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                            {passwordValidation.messages.map((msg, i) => (
                                <li key={i}>{msg}</li>
                            ))}
                        </ul>
                    </div>,
                    { autoClose: 5000 }
                );
                return;
            }
        }
      
        try {
            const updateData = {
                website: editingCredential.website,
                master_password: editFormData.master_password
            };
        
            if (editFormData.new_website && editFormData.new_website !== editingCredential.website) {
                updateData.new_website = editFormData.new_website;
            }
            if (editFormData.new_username && editFormData.new_username !== editingCredential.username) {
                updateData.new_username = editFormData.new_username;
            }
            if (editFormData.new_password) {
                updateData.new_password = editFormData.new_password;
            }
        
            await updateCredentials(updateData).unwrap();
            toast.success('Credentials updated successfully');
            setIsModalOpen(false);
            refetch();
        } catch (err) {
            toast.error(`Failed to update: ${err.data?.message || err.message}`);
        }
    };

    const passwordValidation = editFormData.new_password ? 
        validatePassword(editFormData.new_password) : 
        { isValid: true, messages: [] };

    const isPasswordValid = passwordValidation.isValid || !passwordTouched;

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading credentials...</p>
            </div>
        );
    }

    return (
        <div className={styles.viewCredentials}>
            <div className={styles.headerContainer}>
                <h2>Your <span>safePass</span> Credentials</h2>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search credentials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {filteredCredentials?.length === 0 ? (
                <div className={styles.emptyState}>
                    <FiFolder className={styles.emptyIcon} />
                    <p>{searchTerm ? 'No matching credentials found' : 'You haven\'t saved any credentials yet'}</p>
                    <button onClick={() => navigate('/account/save-credentials')}>
                        <FiKey /> Add Your First Credentials
                    </button>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.credentialsTable}>
                        <thead>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCredentials?.map((cred, index) => (
                                <tr key={index}>
                                    <td>{cred.website || 'N/A'}</td>
                                    <td>{cred.username || 'N/A'}</td>
                                    <td className={styles.passwordCell}>
                                        <span>
                                            {visiblePasswords[cred.website] ? cred.password || 'N/A' : '••••••••'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility(cred.website)}
                                            className={styles.toggleButton}
                                            aria-label={visiblePasswords[cred.website] ? 'Hide password' : 'Show password'}
                                        >
                                            {visiblePasswords[cred.website] ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </td>
                                    <td className={styles.actionsCell}>
                                        <button 
                                            onClick={() => handleEdit(cred)}
                                            className={styles.editButton}
                                            aria-label="Edit credentials"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(cred.website)}
                                            className={styles.deleteButton}
                                            aria-label="Delete credentials"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h3>Edit Credentials for {editingCredential?.website}</h3>
                <form onSubmit={handleUpdate}>
                    <div className={styles.formGroup}>
                        <label>Master Password (required)</label>
                        <input
                            type="password"
                            name="master_password"
                            value={editFormData.master_password}
                            onChange={handleEditChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>New Website</label>
                        <input
                            type="text"
                            name="new_website"
                            value={editFormData.new_website}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>New Username</label>
                        <input
                            type="text"
                            name="new_username"
                            value={editFormData.new_username}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>New Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="new_password"
                                value={editFormData.new_password}
                                onChange={handleEditChange}
                                className={!isPasswordValid ? styles.passwordError : ''}
                                maxLength={29}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {passwordTouched && !passwordValidation.isValid && (
                            <div className={styles.passwordRequirements}>
                                <p>Password must contain:</p>
                                <ul>
                                    {passwordValidation.messages.map((msg, i) => (
                                        <li key={i}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.modalButtons}>
                        <button type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={!!deleteConfirm}
                onRequestClose={() => setDeleteConfirm(null)}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete credentials for {deleteConfirm}?</p>
                <div className={styles.modalButtons}>
                    <button type="button" onClick={() => setDeleteConfirm(null)}>
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={confirmDelete}
                        className={styles.deleteButton}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ViewCredentials;