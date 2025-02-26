import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

import NotesApp from './pages/NotesApp/NotesApp';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
{/* Password forgot/reset yet to implemet */}
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
    <AuthProvider>
      <SettingsProvider>
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

            {/* idk how this one would actually be implemented ngl */}
            <Route 
              path="/auth/reset-password/:token" 
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
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
}
