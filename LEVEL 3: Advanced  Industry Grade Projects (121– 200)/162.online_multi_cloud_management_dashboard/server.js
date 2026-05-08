const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let clouds = [];

// GET all
app.get('/api/clouds', (req, res) => res.json(clouds));

// POST create
app.post('/api/clouds', (req, res) => {
  const { id, provider, region, status } = req.body;
  const record = { id: uuidv4(), id, provider, region, status, createdAt: new Date() };
  clouds.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/clouds/:id', (req, res) => {
  const idx = clouds.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  clouds[idx] = { ...clouds[idx], ...req.body };
  res.json(clouds[idx]);
});

// DELETE
app.delete('/api/clouds/:id', (req, res) => {
  clouds = clouds.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '162', name: 'Online Multi-Cloud Management Dashboard' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ☁️  Project #162: Online Multi-Cloud Management Dashboard');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
