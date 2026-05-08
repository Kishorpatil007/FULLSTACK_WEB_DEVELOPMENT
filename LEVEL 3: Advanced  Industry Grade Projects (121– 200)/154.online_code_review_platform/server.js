const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let prs = [];

// GET all
app.get('/api/prs', (req, res) => res.json(prs));

// POST create
app.post('/api/prs', (req, res) => {
  const { id, title, author, status, diff } = req.body;
  const record = { id: uuidv4(), id, title, author, status, diff, createdAt: new Date() };
  prs.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/prs/:id', (req, res) => {
  const idx = prs.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  prs[idx] = { ...prs[idx], ...req.body };
  res.json(prs[idx]);
});

// DELETE
app.delete('/api/prs/:id', (req, res) => {
  prs = prs.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '154', name: 'Online Code Review Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🔍  Project #154: Online Code Review Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
