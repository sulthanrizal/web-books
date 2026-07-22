require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/book.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Web Books API is running' });
});

app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
