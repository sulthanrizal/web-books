const { eq } = require('drizzle-orm');
const { db, books } = require('../db');

exports.getAllBooks = async (req, res) => {
  const result = await db.select().from(books);
  res.json(result);
};

exports.getBookById = async (req, res) => {
  const [book] = await db.select().from(books).where(eq(books.id, Number(req.params.id)));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, description, isbn, coverUrl, publishedYear, categoryId } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'title and author are required' });
  }
  const [book] = await db
    .insert(books)
    .values({ title, author, description, isbn, coverUrl, publishedYear, categoryId })
    .returning();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const { title, author, description, isbn, coverUrl, publishedYear, categoryId } = req.body;
  const [book] = await db
    .update(books)
    .set({
      ...(title && { title }),
      ...(author && { author }),
      ...(description !== undefined && { description }),
      ...(isbn !== undefined && { isbn }),
      ...(coverUrl !== undefined && { coverUrl }),
      ...(publishedYear !== undefined && { publishedYear }),
      ...(categoryId !== undefined && { categoryId }),
    })
    .where(eq(books.id, Number(req.params.id)))
    .returning();
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const [book] = await db.delete(books).where(eq(books.id, Number(req.params.id))).returning();
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(204).send();
};
