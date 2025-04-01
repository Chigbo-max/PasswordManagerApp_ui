import { FiLock } from 'react-icons/fi'; 
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.padlockContainer}>
                <FiLock className={styles.padlockIcon} />
            </div>
            <span className={styles.logoText}>
                <span className={styles.safe}>safe</span>
                <span className={styles.pass}>Pass</span>
            </span>
        </div>
    );
};

export default Logo;