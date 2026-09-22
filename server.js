const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "books.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------- helpers ----------
function readBooks() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

function nextId(books) {
  return books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
}

// ---------- API routes ----------

// GET all books (supports ?search=&category=&sort=)
app.get("/api/books", (req, res) => {
  let books = readBooks();
  const { search, category, sort } = req.query;

  if (search) {
    const q = search.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }

  if (category && category !== "All") {
    books = books.filter((b) => b.category === category);
  }

  if (sort === "price-asc") books.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") books.sort((a, b) => b.price - a.price);
  if (sort === "rating") books.sort((a, b) => b.rating - a.rating);

  res.json(books);
});

// GET distinct categories
app.get("/api/categories", (req, res) => {
  const books = readBooks();
  const categories = [...new Set(books.map((b) => b.category))];
  res.json(categories);
});

// GET single book
app.get("/api/books/:id", (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST create book (admin)
app.post("/api/books", (req, res) => {
  const books = readBooks();
  const { title, author, category, price, stock, cover, description } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ error: "title, author and price are required" });
  }

  const newBook = {
    id: nextId(books),
    title,
    author,
    category: category || "General",
    price: Number(price),
    stock: Number(stock) || 0,
    rating: 0,
    cover: cover || "https://via.placeholder.com/200x280?text=No+Cover",
    description: description || "",
  };

  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// PUT update book (admin)
app.put("/api/books/:id", (req, res) => {
  const books = readBooks();
  const idx = books.findIndex((b) => b.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });

  books[idx] = { ...books[idx], ...req.body, id: books[idx].id };
  writeBooks(books);
  res.json(books[idx]);
});

// DELETE book (admin)
app.delete("/api/books/:id", (req, res) => {
  const books = readBooks();
  const filtered = books.filter((b) => b.id !== Number(req.params.id));
  if (filtered.length === books.length) {
    return res.status(404).json({ error: "Book not found" });
  }
  writeBooks(filtered);
  res.json({ message: "Book deleted" });
});

// POST checkout - reduces stock for each item in the cart
app.post("/api/checkout", (req, res) => {
  const { items } = req.body; // [{ id, qty }]
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const books = readBooks();
  let total = 0;

  for (const item of items) {
    const book = books.find((b) => b.id === item.id);
    if (!book) return res.status(404).json({ error: `Book ${item.id} not found` });
    if (book.stock < item.qty) {
      return res.status(400).json({ error: `Not enough stock for "${book.title}"` });
    }
  }

  for (const item of items) {
    const book = books.find((b) => b.id === item.id);
    book.stock -= item.qty;
    total += book.price * item.qty;
  }

  writeBooks(books);
  res.json({ message: "Order placed successfully", total, orderId: Date.now() });
});

// Fallback to index.html for any non-API route (simple SPA-ish behavior)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`📚 Online Book Store running at http://localhost:${PORT}`);
});
