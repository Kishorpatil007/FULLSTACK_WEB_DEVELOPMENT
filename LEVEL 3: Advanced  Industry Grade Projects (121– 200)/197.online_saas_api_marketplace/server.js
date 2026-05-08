const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let apis = [];

// GET all
app.get('/api/apis', (req, res) => res.json(apis));

// POST create
app.post('/api/apis', (req, res) => {
  const { id, name, provider, price, category } = req.body;
  const record = { id: uuidv4(), id, name, provider, price, category, createdAt: new Date() };
  apis.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/apis/:id', (req, res) => {
  const idx = apis.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  apis[idx] = { ...apis[idx], ...req.body };
  res.json(apis[idx]);
});

// DELETE
app.delete('/api/apis/:id', (req, res) => {
  apis = apis.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '197', name: 'Online SaaS API Marketplace' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🛒  Project #197: Online SaaS API Marketplace');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
