const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
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
}

export const getBooks = () => request('/api/books');
export const getBook = (id) => request(`/api/books/${id}`);
export const createBook = (data) =>
  request('/api/books', { method: 'POST', body: JSON.stringify(data) });
export const updateBook = (id, data) =>
  request(`/api/books/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBook = (id) => request(`/api/books/${id}`, { method: 'DELETE' });
