const API_URL = `${import.meta.env.VITE_API_URL}`;

export async function loginAPI(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || 'Login failed';
    throw new Error(message);
  }

  return data.token;
}



export async function registerAPI (email, password){
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const message = data.message || 'Registration failed';
    throw new Error(message);
  }
  const data = await res.json();
  return data.token;
};

export async function googleLoginAPI(googleToken){
  const res = await fetch(`${API_URL}/auth/google-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: googleToken }),
  });
  if (!res.ok) {
    const message = data.message || 'Google Login failed';
    throw new Error(message);
  }
  const data = await res.json();
  return data.token;
};


//ForgottenPassword
export async function sendRecoveryEmail(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const message = data.message || 'Password reset request failed';
    throw new Error(message);
  }
  return res.json();
}

// Reset Password from email recovery link
export async function resetPasswordAPI(linkToken,newPassword) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linkToken, newPassword }),
  });
  if (!res.ok) {
    const message = data.message || 'Password reset request failed';
    throw new Error(message);
  }
  return res.json();
}

// Change password from settings
export async function changePasswordAPI(authtoken,currentPassword,newPassword) {

  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authtoken, currentPassword, newPassword }),
  });

  if (!res.ok) {
    const message = data.message || 'Password change request failed';
    throw new Error(message);
  }

  return res.json();
}