import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

import NotesApp from './pages/NotesApp/NotesApp';

import AuthPage from './pages/AuthPage/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

import './styles/designTokens.css';
import './styles/global.css';
import './styles/customSettings.css';

//#0E121B changed to currentColor for every svg

// PrivateRoute Component for Protected Routes

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default function App() {

  const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route 
          path="/auth/reset-password" 
          element={<ResetPasswordPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NotesApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
