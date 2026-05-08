const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let tenants = [];

// GET all
app.get('/api/tenants', (req, res) => res.json(tenants));

// POST create
app.post('/api/tenants', (req, res) => {
  const { id, name, plan, config } = req.body;
  const record = { id: uuidv4(), id, name, plan, config, createdAt: new Date() };
  tenants.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/tenants/:id', (req, res) => {
  const idx = tenants.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  tenants[idx] = { ...tenants[idx], ...req.body };
  res.json(tenants[idx]);
});

// DELETE
app.delete('/api/tenants/:id', (req, res) => {
  tenants = tenants.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '178', name: 'Online AI-Based Recommendation SaaS' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  💡  Project #178: Online AI-Based Recommendation SaaS');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
