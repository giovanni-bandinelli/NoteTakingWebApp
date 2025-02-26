import { useState, } from 'react';
import { AppLogo, InfoIcon} from '../../components/icons';


import sharedStyles from '../../styles/AuthLayout.module.css';
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

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
        <form onSubmit={()=>(console.log("Hiiii!!!"))} className={sharedStyles.form}>

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
      </div>
    </div>)
}