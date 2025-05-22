const API_URL = `${import.meta.env.VITE_API_URL}`; 
async function authFetch(url, options = {}, token ) {
  
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.status === 204 ? null : res.json();
}

export async function getFontAPI(token) {
  return await authFetch(`${API_URL}/settings/font`, {}, token);
}

export async function updateFontAPI(token, font) {
  return await authFetch(`${API_URL}/settings/font`, {
    method: 'POST',
    body: JSON.stringify({ font })
  }, token);
}

export async function getThemeAPI(token) {
  return await authFetch(`${API_URL}/settings/theme`, {}, token);
}

export async function updateThemeAPI(token, theme) {
  return await authFetch(`${API_URL}/settings/theme`, {
    method: 'POST',
    body: JSON.stringify({ theme })
  }, token);
}
