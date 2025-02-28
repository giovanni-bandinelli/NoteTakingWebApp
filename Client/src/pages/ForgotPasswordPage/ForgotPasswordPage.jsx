
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import sharedStyles from '../../styles/AuthLayout.module.css';
import { AppLogo, InfoIcon} from '../../components/icons';
import { sendRecoveryEmail } from '../../api/auth.api.js'; // Make sure to implement this in your API file

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await sendRecoveryEmail(email);
      setMessage('If the email exists, a password reset link has been sent.');
      navigate('/');  // Redirect user to login page (or stay on this page based on your UX)
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={sharedStyles.authPageWrapper}>
      <div className={sharedStyles.container}>
        <header className={sharedStyles.header}>
            <AppLogo />
            <h1 className="text-preset-1">
                Forgotten Your Password?
            </h1>
            <p className="text-preset-5">
                Enter your email below, and we'll send you a link to reset it.
            </p>
        </header>
        <form onSubmit={handleSubmit} className={sharedStyles.form}>

            <div className={sharedStyles.formGroup}>
                <label className="text-preset-4">Email Address</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className={sharedStyles.input}
                />
            </div>

            <button type="submit" className={sharedStyles.submitButton}>
                <span>Send Reset Link</span>
            </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>)
}
