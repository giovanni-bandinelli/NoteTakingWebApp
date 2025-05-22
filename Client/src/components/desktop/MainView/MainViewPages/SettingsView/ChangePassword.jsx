import { useState } from 'react';
import PasswordInput from '../../../../PasswordInput/PasswordInput';
import { changePasswordAPI } from '../../../../../api/auth.api';
import styles from './ChangePassword.module.css';
import { InfoIcon } from '../../../../icons';
import { useToast } from '../../../../../context/ToastContext';
export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');

    const {showToast} = useToast()

    async function handleSubmit(e) {
        e.preventDefault();

        if (newPassword.length < 8) {
            setFormError('New password must be at least 8 characters long.');
            return;
        }
        if (newPassword === currentPassword) {
            setFormError("New password can't be the same as the old one.");
            return;
        }
        if (confirmPassword !== newPassword) {
            setFormError("Passwords don't match.");
            return;
        }

        const token = localStorage.getItem('authToken');
        try {
            await changePasswordAPI(token, currentPassword, newPassword);
            showToast({ type: 'success', message: 'Password changed successfully!' });
            setFormError('');
        } catch (err) {
            if (err.message.includes('Too many')) {showToast({ type: 'error', message: err.message })};
            const isWrongOldPassword = err.message.includes('401');
            showToast({ type: 'error', message: isWrongOldPassword ? 'Old password is incorrect.' :'Something went wrong. try again' });
        }
    }

    return (
        <form className={styles.themeForm} onSubmit={handleSubmit} autoComplete='off'>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Change Password</h2>
            </div>
            {formError && (
            <div className={styles.errorMessage}>
                <p className="text-preset-5" style={{ color: 'var(--Red-500)' }}><span className={styles.infoIcon}><InfoIcon/></span>{formError}</p>
            </div>
            )}
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
