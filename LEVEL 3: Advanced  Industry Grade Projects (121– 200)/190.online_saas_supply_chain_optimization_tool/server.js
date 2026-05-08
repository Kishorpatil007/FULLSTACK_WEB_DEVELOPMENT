const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let suppliers = [];

// GET all
app.get('/api/suppliers', (req, res) => res.json(suppliers));

// POST create
app.post('/api/suppliers', (req, res) => {
  const { id, name, leadTime, reliability, cost } = req.body;
  const record = { id: uuidv4(), id, name, leadTime, reliability, cost, createdAt: new Date() };
  suppliers.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/suppliers/:id', (req, res) => {
  const idx = suppliers.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  suppliers[idx] = { ...suppliers[idx], ...req.body };
  res.json(suppliers[idx]);
});

// DELETE
app.delete('/api/suppliers/:id', (req, res) => {
  suppliers = suppliers.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '190', name: 'Online SaaS Supply Chain Optimization Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🔗  Project #190: Online SaaS Supply Chain Optimization To');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
