import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import { AuthContext } from '../../context/AuthContext';
import { loginAPI, registerAPI, googleLoginAPI} from '../../api/auth.api.js'

import { AppLogo, GoogleIcon } from '../../components/icons';
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

  const googleLogin = useGoogleLogin({//99% sure something is off here but idk
    onSuccess: async (response) => {
      try {
        console.log("Google response:", response);
        
        const googleToken = response.access_token; // ✅ Correct way to get the token
        if (!googleToken) {
          throw new Error("No Google token received");
        }
    
        const authToken = await googleLoginAPI(googleToken); // ✅ Use await
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
  const navigate = useNavigate();

  async function onSubmit(event){
    event.preventDefault();
    try{
      let authToken;
      if (isLogin) {
        authToken = await loginAPI(email,password);
      } else {
        authToken = await registerAPI(email, password);
      }
      localStorage.setItem('authToken', authToken);
      setIsAuthenticated(true);
      navigate('/');
    }catch (err){
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className={sharedStyles.form}>

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
        <PasswordInput password={password} setPassword={setPassword} />
      </div>

      <button type="submit" className={sharedStyles.submitButton}>
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
