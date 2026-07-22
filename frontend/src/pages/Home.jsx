import { useBooks } from '../hooks/useBooks'
import { deleteBook } from '../service/book.service'
import { useEffect } from 'react'
import './Home.css'

function Home() {
  const { books, loading, error } = useBooks()

  const handleDelete = (id) => {
    const book = books.find((b) => b.id === id)
    const confirmed = window.confirm(`Yakin mau hapus buku "${book.title}"?`)
    if (confirmed) {
      deleteBook(book.id)
    }
  }

  return (
    <section id="home">
      <h1>Books</h1>

      {loading && <p>Loading books...</p>}
      {error && <p className="error">Failed to load books: {error}</p>}

      {!loading && !error && (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-card">
              <button
                type="button"
                className="delete-btn"
                aria-label="Delete book"
                onClick={() => handleDelete(book.id)}
              >
                🗑
              </button>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Home
