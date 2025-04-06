
import { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from '../icons';

import styles from './PasswordInput.module.css';


export default function PasswordInput({ password, setPassword, placeholderText='', autocomplete="on" }) {
    const [passwordIsHidden, setPasswordIsHidden] = useState(true);
  
    const togglePasswordVisibility = () => {
      setPasswordIsHidden((prev) => !prev);
    };
  
    return (
      <div className={styles.passwordInputWrapper}>
        <input
          type={passwordIsHidden ? 'password' : 'text'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`${styles.input} ${styles.passwordInput}`}
          placeholder={placeholderText}
          autoComplete={autocomplete}
        />
        <button
          type="button"
          className={styles.VisibilityToggleButton}
          onClick={togglePasswordVisibility}
          aria-label={passwordIsHidden ? 'Show password' : 'Hide password'}
        >
          {passwordIsHidden ? <HidePasswordIcon/> : <ShowPasswordIcon/>}
        </button>
      </div>
    );
  }