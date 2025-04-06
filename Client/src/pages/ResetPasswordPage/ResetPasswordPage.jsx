import { useEffect, useState, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppLogo, InfoIcon} from '../../components/icons';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { changePasswordAPI} from '../../api/auth.api.js'//to define

import styles from '../../styles/AuthLayout.module.css';
export default function ResetPasswordPage() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('')
    const [isValid,setIsValid] = useState(null)
    const location = useLocation();
    const API_URL = `${import.meta.env.VITE_API_URL}`;

    const linkToken = (new URLSearchParams(location.search)).get("token");
    console.log(linkToken);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!linkToken) {
            setIsValid(false); // No token found
            return;
        }
        async function verifyToken() {
            try {
                const response = await fetch(`${API_URL}/auth/verify`, {
                    method: 'GET',
                    headers:{'Authorization': `Bearer ${linkToken}`} ,
                });

                if (response.ok) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } catch (err) {
            console.error('Error verifying token:', err);
            setIsValid(false);
            }
        }    
        verifyToken();
    },[linkToken]);
        
    async function onSubmit(e){
        e.preventDefault();
        if(newPassword !== confirmNewPassword){
            setMessage("Passwords do not match");
            return
        }
        try {
            await changePasswordAPI(linkToken,newPassword);//password can be taken from form, but email maybe extracted from token(server logic to modify)??
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    }

    if(isValid === null){
        return(
            <div className={styles.authPageWrapper}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <AppLogo />
                        <h1 className="text-preset-1">
                            Verifying Recovery Link...
                        </h1>
                        <p className="text-preset-5">
                            Please wait
                        </p>
                    </header>
                </div>
            </div>
        )
    }

    if(isValid === false){
        return(
            <div className={styles.authPageWrapper}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <AppLogo />
                        <h1 className="text-preset-1">
                            Invalid or Expired Recovery Link
                        </h1>
                        <p className="text-preset-5">
                            Please wait
                        </p>
                    </header>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.authPageWrapper}>
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
                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className="text-preset-4">New Password</label>
                        <PasswordInput password={newPassword} setPassword={setNewPassword} />
                        <p className={styles.hintText}><InfoIcon/>At least 8 characters</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label className="text-preset-4">Confirm New Password</label>
                        <PasswordInput password={confirmNewPassword} setPassword={setConfirmNewPassword} />
                    </div>
                    {message && <p className={styles.errorMessage}>{message}</p>}
                    <button type="submit" className={styles.submitButton}>
                        <span>Reset Password</span>
                    </button>
                </form>
            </div>
        </div>
    )
}