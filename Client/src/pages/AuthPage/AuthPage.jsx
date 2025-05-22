import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { AuthContext } from '../../context/AuthContext';
import { loginAPI, registerAPI, googleLoginAPI} from '../../api/auth.api.js'

import { AppLogo, GoogleIcon, InfoIcon } from '../../components/icons';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

import sharedStyles from '../../styles/AuthLayout.module.css';
import localStyles from './AuthPage.module.css';


// Header Component
function HeaderContent({ isLogin }) {
  return (
    <header className={sharedStyles.header}>
      <AppLogo />
      <h1 className="text-preset-1">
        {isLogin ? 'Welcome to Note' : 'Create Your Account'}
      </h1>
      <p className="text-preset-5">
        {isLogin
          ? 'Please log in to continue'
          : 'Sign up to start organizing your notes and boost productivity'}
      </p>
    </header>
  );
}

// OAuthButtons Component
function OAuthButtons() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const googleToken = response.access_token; 
        if (!googleToken) {
          throw new Error("No Google token received");
        }
    
        const authToken = await googleLoginAPI(googleToken); 
        localStorage.setItem('authToken', authToken);
        setIsAuthenticated(true);
        navigate("/"); 
      } catch (error) {
        console.error('Google Login Error:', error);
      }
    },
    onError: () => {console.log("Google Login Failed")},
    ux_mode: "popup",
  });

  return (
    <div className={localStyles.oauthSection}>
      <div className={localStyles.oauthDivider}>Or log in with:</div>
      <button type="button" className={localStyles.googleButton} onClick={googleLogin}>
        <GoogleIcon />
        <span>Google</span>
      </button>
    </div>
  );
}



// FormSection Component
function FormSection({ isLogin, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

async function onSubmit(event) {
  event.preventDefault();

  setFormError('');

  // Basic client-side validation (for register)
  if (!isLogin) {
    if (!email.includes('@')) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
  }

  try {
    let authToken;

    if (isLogin) {
      authToken = await loginAPI(email, password);
    } else {
      authToken = await registerAPI(email, password);
    }
    localStorage.setItem('authToken', authToken);
    setIsAuthenticated(true);
    navigate('/');
  } catch (err) {
    console.error(err);
    // Parse known errors
    const message = err.message || '';
    if (message.includes('401') || message.toLowerCase().includes('unauthorized')) {
      setFormError("Invalid credentials.");
    } else if (message.includes('already registered')) {
      setFormError("Email is already in use.");
    } else {
      setFormError("Something went wrong. Please try again.");
    }
  }
}


  return (
    <form onSubmit={onSubmit} className={sharedStyles.form}>
      {formError && (
        <p className={sharedStyles.errorMessage}><InfoIcon/>{formError}</p>
      )}
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

      <div className={sharedStyles.formGroup}>
        <div className={localStyles.labelRow}>
          <label className="text-preset-4">Password</label>
          {isLogin && (
            <button onClick={() => navigate('/auth/forgot-password')} className={`${localStyles.forgotPassword} text-preset-4`}>
              Forgot
            </button>
          )}
        </div>
        <PasswordInput password={password} setPassword={setPassword} placeholderText={"Enter your password"} />
        {!isLogin && (<p className={sharedStyles.hintText}><InfoIcon/>At least 8 characters</p>)}
      </div>

      <button type="submit" className={`blueButton ${sharedStyles.submitButton}`}>
        <span>{isLogin ? 'Login' : 'Sign Up'}</span>
      </button>
      
      <OAuthButtons />
    </form>
  );
}

// Footer Component
function FooterContent({ isLogin, setisLogin }) {
  return (
    <footer className={localStyles.footer}>
      {isLogin ? (
        <p>
          No account yet?{' '}
          <span onClick={() => setisLogin(false)}>Sign up</span>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <span onClick={() => setisLogin(true)}>Login</span>
        </p>
      )}
    </footer>
  );
}


// Main AuthPage Component
export default function AuthPage() {
  const [isLogin, setisLogin] = useState(true);
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <div className={sharedStyles.authPageWrapper}>
      <div className={sharedStyles.container}>
        <HeaderContent isLogin={isLogin} />
        <FormSection isLogin={isLogin} setIsAuthenticated={setIsAuthenticated} />
        <FooterContent isLogin={isLogin} setisLogin={setisLogin} />
      </div>
    </div>
  );
}
