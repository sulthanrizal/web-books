import { request } from './http';

export const getBooks = () => request('/api/books');
export const getBook = (id) => request(`/api/books/${id}`);
export const createBook = (data) =>
  request('/api/books', { method: 'POST', body: JSON.stringify(data) });
export const updateBook = (id, data) =>
  request(`/api/books/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBook = (id) => request(`/api/books/${id}`, { method: 'DELETE' });
