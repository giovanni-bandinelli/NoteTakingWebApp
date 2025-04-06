const API_URL = `${import.meta.env.VITE_API_URL}`; // "http://localhost:5000" for now

export async function loginAPI(email, password){
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok){
    const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Login failed: ${errorData.message || 'No error message'}`);
  }
  const data = await res.json();
  return data.token;
};


export async function registerAPI (email, password){
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  const data = await res.json();
  return data.token;
};

export async function googleLoginAPI(googleToken){
  const res = await fetch(`${API_URL}/auth/google-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: googleToken }),
  });
  if (!res.ok) throw new Error('Google login failed');
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

  if (!res.ok) throw new Error('Password reset request failed');
  return res.json();
}

export async function changePasswordAPI(linkToken,newPassword) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linkToken, newPassword }),
  });

  if (!res.ok) throw new Error('Password reset failed');
  return res.json();
}

