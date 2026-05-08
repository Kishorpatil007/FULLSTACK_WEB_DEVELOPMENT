const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let index = [];

// GET all
app.get('/api/index', (req, res) => res.json(index));

// POST create
app.post('/api/index', (req, res) => {
  const { id, content, title, url, score } = req.body;
  const record = { id: uuidv4(), id, content, title, url, score, createdAt: new Date() };
  index.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/index/:id', (req, res) => {
  const idx = index.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  index[idx] = { ...index[idx], ...req.body };
  res.json(index[idx]);
});

// DELETE
app.delete('/api/index/:id', (req, res) => {
  index = index.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '167', name: 'Online AI-Powered Search Engine' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🔍  Project #167: Online AI-Powered Search Engine');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
