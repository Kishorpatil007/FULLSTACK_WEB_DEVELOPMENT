const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let assets = [];

// GET all
app.get('/api/assets', (req, res) => res.json(assets));

// POST create
app.post('/api/assets', (req, res) => {
  const { id, name, type, url, tags } = req.body;
  const record = { id: uuidv4(), id, name, type, url, tags, createdAt: new Date() };
  assets.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/assets/:id', (req, res) => {
  const idx = assets.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  assets[idx] = { ...assets[idx], ...req.body };
  res.json(assets[idx]);
});

// DELETE
app.delete('/api/assets/:id', (req, res) => {
  assets = assets.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '166', name: 'Online Digital Asset Management System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎨  Project #166: Online Digital Asset Management System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
