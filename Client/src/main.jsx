import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext.jsx';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <SettingsProvider>
          <App /> 
        </SettingsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)



