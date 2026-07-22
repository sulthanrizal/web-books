const { pgSchema, serial, varchar } = require('drizzle-orm/pg-core');

const webBooksSchema = pgSchema('web-books');

const books = webBooksSchema.table('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
});

module.exports = { books };
