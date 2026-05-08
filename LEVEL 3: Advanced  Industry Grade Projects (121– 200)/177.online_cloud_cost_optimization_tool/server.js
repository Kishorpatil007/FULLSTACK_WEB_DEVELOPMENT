const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let resources = [];

// GET all
app.get('/api/resources', (req, res) => res.json(resources));

// POST create
app.post('/api/resources', (req, res) => {
  const { id, name, type, provider, cost } = req.body;
  const record = { id: uuidv4(), id, name, type, provider, cost, createdAt: new Date() };
  resources.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/resources/:id', (req, res) => {
  const idx = resources.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  resources[idx] = { ...resources[idx], ...req.body };
  res.json(resources[idx]);
});

// DELETE
app.delete('/api/resources/:id', (req, res) => {
  resources = resources.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '177', name: 'Online Cloud Cost Optimization Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  💸  Project #177: Online Cloud Cost Optimization Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
