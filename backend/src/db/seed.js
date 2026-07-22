require('dotenv').config();
const { db, categories, books } = require('./index');

const categoryNames = ['Fiksi', 'Sastra Klasik', 'Sejarah', 'Fantasi', 'Non-Fiksi'];

const bookSeeds = [
  {
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    description: 'Kisah perjuangan anak-anak Belitung mengejar pendidikan.',
    publishedYear: 2005,
    category: 'Fiksi',
  },
  {
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    description: 'Novel sejarah tentang kebangkitan kesadaran pribumi di era kolonial.',
    publishedYear: 1980,
    category: 'Sastra Klasik',
  },
  {
    title: 'Cantik Itu Luka',
    author: 'Eka Kurniawan',
    description: 'Novel magis-realis tentang sejarah dan keluarga di Indonesia.',
    publishedYear: 2002,
    category: 'Fiksi',
  },
  {
    title: 'Negeri 5 Menara',
    author: 'Ahmad Fuadi',
    description: 'Perjalanan santri mengejar mimpi ke berbagai penjuru dunia.',
    publishedYear: 2009,
    category: 'Fiksi',
  },
  {
    title: 'Sang Pemimpi',
    author: 'Andrea Hirata',
    description: 'Lanjutan kisah Laskar Pelangi tentang mimpi dan persahabatan.',
    publishedYear: 2006,
    category: 'Fiksi',
  },
  {
    title: 'Ronggeng Dukuh Paruk',
    author: 'Ahmad Tohari',
    description: 'Novel klasik tentang budaya dan tragedi di pedesaan Jawa.',
    publishedYear: 1982,
    category: 'Sastra Klasik',
  },
  {
    title: 'Ayat-Ayat Cinta',
    author: 'Habiburrahman El Shirazy',
    description: 'Novel religi-romantis berlatar Kairo, Mesir.',
    publishedYear: 2004,
    category: 'Fiksi',
  },
  {
    title: 'Perahu Kertas',
    author: 'Dee Lestari',
    description: 'Kisah cinta dan pencarian jati diri dua anak muda.',
    publishedYear: 2009,
    category: 'Fiksi',
  },
  {
    title: 'Gadis Kretek',
    author: 'Ratih Kumala',
    description: 'Novel sejarah industri kretek dan cinta lintas generasi.',
    publishedYear: 2012,
    category: 'Sejarah',
  },
  {
    title: 'Filosofi Kopi',
    author: 'Dee Lestari',
    description: 'Kumpulan cerita pendek tentang kopi, cinta, dan kehidupan.',
    publishedYear: 2006,
    category: 'Non-Fiksi',
  },
];

async function seed() {
  await db
    .insert(categories)
    .values(categoryNames.map((name) => ({ name })))
    .onConflictDoNothing();

  const allCategories = await db.select().from(categories);
  const categoryIdByName = Object.fromEntries(allCategories.map((c) => [c.name, c.id]));

  const existingBooks = await db.select({ title: books.title }).from(books);
  const existingTitles = new Set(existingBooks.map((b) => b.title));

  const toInsert = bookSeeds
    .filter((b) => !existingTitles.has(b.title))
    .map(({ category, ...rest }) => ({ ...rest, categoryId: categoryIdByName[category] }));

  if (toInsert.length === 0) {
    console.log('Books already seeded, nothing to insert.');
    return;
  }

  await db.insert(books).values(toInsert);
  console.log(`Inserted ${toInsert.length} book(s).`);
}

seed()
  .then(() => {
    console.log('Seed complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
