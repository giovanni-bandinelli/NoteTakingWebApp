import { useState } from 'react';
import PasswordInput from '../../../../PasswordInput/PasswordInput';
import { changePasswordAPI } from '../../../../../api/auth.api';
import styles from './ChangePassword.module.css';
import { InfoIcon } from '../../../../icons';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (confirmPassword !== newPassword) {
            console.log("Password Confirmation doesn't match");
        }
        const token = localStorage.getItem('authToken');
        try {
            await changePasswordAPI(token, currentPassword, newPassword);
            console.log("Password changed successfully!");
        } catch (err) {
            console.error("Error changing password:", err);
        }
    }

    return (
        <form className={styles.themeForm} onSubmit={handleSubmit} autoComplete='off'>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Change Password</h2>
            </div>

            <div className={styles.passwordInputsWrapper}>
                <label> 
                    <h3 className='text-preset-4'>Old Password</h3>
                    <PasswordInput 
                        name="current-password" 
                        autocomplete="current-password"
                        password={currentPassword}
                        setPassword={setCurrentPassword}
                    />
                </label>
                <label>
                    <h3 className='text-preset-4'>New Password</h3>
                    <PasswordInput 
                        name="new-password" 
                        autocomplete="new-password"
                        password={newPassword}
                        setPassword={setNewPassword}
                    />
                    <p className={`${styles.hintText} text-preset-5`}><InfoIcon style={{fontSize:"var(--text-preset-5-font-size)", stroke:"red"}} />At least 8 characters</p>    
                </label>
                <label>
                    <h3 className='text-preset-4'>Confirm New Password</h3>
                    <PasswordInput 
                        name="confirm-password" 
                        autocomplete="new-password"
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
                    />
                </label>
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={`blueButton ${styles.submitButton}`} id="applyButton">Save Password</button>
            </div>
        </form>
    );
}
