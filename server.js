const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 10000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data');
const USERS_FILE = path.join(DATA, 'users.json');
const ORDERS_FILE = path.join(DATA, 'orders.json');
const BOOKS_FILE = path.join(DATA, 'books.json');

if (!fs.existsSync(DATA)) fs.mkdirSync(DATA, { recursive: true });
function ensureFile(file, fallback) { if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2)); }
ensureFile(USERS_FILE, []);
ensureFile(ORDERS_FILE, []);
ensureFile(BOOKS_FILE, []);
function read(file) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; } }
function write(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }
function safeUser(u) { return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt }; }

const sessions = new Map();
const appSessions = new Map();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(ROOT, 'public')));

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  const userId = sessions.get(token);
  if (!token || !userId) return res.status(401).json({ message: 'Please sign in first.' });
  const user = read(USERS_FILE).find(x => x.id === userId);
  if (!user) return res.status(401).json({ message: 'Session expired. Please sign in again.' });
  req.user = user; req.token = token; next();
}

app.get('/api/books', (req, res) => {
  const books = read(BOOKS_FILE);
  res.json(books);
});

app.post('/api/auth/signup', async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (name.length < 2) return res.status(400).json({ message: 'Enter your full name.' });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email.' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  const users = read(USERS_FILE);
  if (users.some(u => u.email === email)) return res.status(409).json({ message: 'An account with this email already exists. Please log in.' });
  const user = { id: uuidv4(), name, email, passwordHash: await bcrypt.hash(password, 10), createdAt: new Date().toISOString() };
  users.push(user); write(USERS_FILE, users);
  const token = uuidv4(); sessions.set(token, user.id);
  res.status(201).json({ message: 'Account created successfully.', token, user: safeUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const user = read(USERS_FILE).find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Incorrect email or password.' });
  const token = uuidv4(); sessions.set(token, user.id);
  res.json({ message: 'Login successful.', token, user: safeUser(user) });
});

app.post('/api/auth/logout', auth, (req, res) => { sessions.delete(req.token); res.json({ message: 'Logged out successfully.' }); });
app.get('/api/auth/me', auth, (req, res) => res.json({ user: safeUser(req.user) }));

app.get('/api/orders', auth, (req, res) => {
  const orders = read(ORDERS_FILE).filter(o => o.userId === req.user.id).sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));
  res.json(orders);
});

app.post('/api/orders', auth, (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const address = req.body.address || {};
  if (!items.length) return res.status(400).json({ message: 'Your cart is empty.' });
  if (!address.name || !address.phone || !address.line || !address.city || !address.pincode) return res.status(400).json({ message: 'Please complete the delivery address.' });
  const books = read(BOOKS_FILE);
  const cleanItems = [];
  let total = 0;
  for (const item of items) {
    const book = books.find(b => b.id === item.id);
    const qty = Math.max(1, Math.min(10, Number(item.qty) || 1));
    if (!book) return res.status(400).json({ message: 'One of the selected books is no longer available.' });
    if (book.stock < qty) return res.status(400).json({ message: `${book.title} has only ${book.stock} copy/copies left.` });
    cleanItems.push({ id: book.id, title: book.title, author: book.author, price: book.price, qty, image: book.image });
    total += book.price * qty;
  }
  cleanItems.forEach(item => { const b = books.find(x => x.id === item.id); b.stock -= item.qty; });
  write(BOOKS_FILE, books);
  const order = { id: 'BN-' + Date.now().toString().slice(-8), userId: req.user.id, items: cleanItems, total, payment: req.body.payment || 'COD', address, status: 'Confirmed', createdAt: new Date().toISOString(), estimatedDelivery: new Date(Date.now()+4*86400000).toISOString().slice(0,10) };
  const orders = read(ORDERS_FILE); orders.push(order); write(ORDERS_FILE, orders);
  res.status(201).json({ message: 'Order placed successfully.', order });
});

app.post('/api/orders/:id/return', auth, (req, res) => {
  const orders = read(ORDERS_FILE);
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ message: 'Order not found.' });
  if (order.status === 'Return Requested' || order.status === 'Returned') return res.status(400).json({ message: 'Return is already requested for this order.' });
  order.status = 'Return Requested'; order.returnReason = String(req.body.reason || 'Changed my mind'); order.returnRequestedAt = new Date().toISOString();
  write(ORDERS_FILE, orders); res.json({ message: 'Return request submitted.', order });
});

app.post('/api/likes', auth, (req, res) => {
  const id = String(req.body.bookId || '');
  const store = appSessions.get(req.user.id) || new Set();
  if (store.has(id)) store.delete(id); else store.add(id);
  appSessions.set(req.user.id, store);
  res.json({ liked: store.has(id), likes: [...store] });
});
app.get('/api/likes', auth, (req, res) => res.json({ likes: [...(appSessions.get(req.user.id) || new Set())] }));

app.get('/admin', (req,res) => res.sendFile(path.join(ROOT,'public','admin.html')));
app.get('*', (req,res) => res.sendFile(path.join(ROOT,'public','index.html')));

app.listen(PORT, () => console.log(`BookNest running on port ${PORT}`));
