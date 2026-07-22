const API_URL = import.meta.env.VITE_API_URL;

export async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Request failed with status ${res.status}`);
    }

    if (res.status === 204) return null;
    return res.json();
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
}
