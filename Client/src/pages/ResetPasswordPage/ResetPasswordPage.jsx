import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppLogo, InfoIcon} from '../../components/icons';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

import styles from '../../styles/AuthLayout.module.css';
export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  return (
    <div className={styles.ResetPasswordPage}>
      <div className={styles.container}>
        <header className={styles.header}>
            <AppLogo />
            <h1 className="text-preset-1">
                Reset Your Password
            </h1>
            <p className="text-preset-5">
                choose a new password to secure your account
            </p>
        </header>
        <form onSubmit={()=>(console.log("Hiiii!!!"))} className={styles.form}>
            <div className={styles.formGroup}>
                <label className="text-preset-4">New Password</label>
                <PasswordInput password={newPassword} setPassword={setNewPassword} />
                <p className={styles.hintText}><InfoIcon/>At least 8 characters</p>
            </div>

            <div className={styles.formGroup}>
                <label className="text-preset-4">Confirm New Password</label>
                <PasswordInput password={confirmNewPassword} setPassword={setConfirmNewPassword} />
            </div>
    
            <button type="submit" className={styles.submitButton}>
                <span>Reset Password</span>
            </button>
        </form>
      </div>
    </div>)
}