const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let dashboards = [];

// GET all
app.get('/api/dashboards', (req, res) => res.json(dashboards));

// POST create
app.post('/api/dashboards', (req, res) => {
  const { id, name, widgets, owner, shared } = req.body;
  const record = { id: uuidv4(), id, name, widgets, owner, shared, createdAt: new Date() };
  dashboards.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/dashboards/:id', (req, res) => {
  const idx = dashboards.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  dashboards[idx] = { ...dashboards[idx], ...req.body };
  res.json(dashboards[idx]);
});

// DELETE
app.delete('/api/dashboards/:id', (req, res) => {
  dashboards = dashboards.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '179', name: 'Online SaaS Business Intelligence Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📉  Project #179: Online SaaS Business Intelligence Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
