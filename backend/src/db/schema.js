const { pgSchema, serial, varchar, text, integer, timestamp } = require('drizzle-orm/pg-core');

const webBooksSchema = pgSchema('web-books');

const categories = webBooksSchema.table('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

const books = webBooksSchema.table('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  description: text('description'),
  isbn: varchar('isbn', { length: 20 }).unique(),
  coverUrl: varchar('cover_url', { length: 500 }),
  publishedYear: integer('published_year'),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

module.exports = { categories, books };
