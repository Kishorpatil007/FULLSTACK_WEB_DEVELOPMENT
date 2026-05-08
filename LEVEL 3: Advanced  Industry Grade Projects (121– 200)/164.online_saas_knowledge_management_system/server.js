const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let articles = [];

// GET all
app.get('/api/articles', (req, res) => res.json(articles));

// POST create
app.post('/api/articles', (req, res) => {
  const { id, title, content, category, author } = req.body;
  const record = { id: uuidv4(), id, title, content, category, author, createdAt: new Date() };
  articles.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/articles/:id', (req, res) => {
  const idx = articles.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  articles[idx] = { ...articles[idx], ...req.body };
  res.json(articles[idx]);
});

// DELETE
app.delete('/api/articles/:id', (req, res) => {
  articles = articles.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '164', name: 'Online SaaS Knowledge Management System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🧠  Project #164: Online SaaS Knowledge Management System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
