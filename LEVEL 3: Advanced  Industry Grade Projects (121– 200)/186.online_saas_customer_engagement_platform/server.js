const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let customers = [];

// GET all
app.get('/api/customers', (req, res) => res.json(customers));

// POST create
app.post('/api/customers', (req, res) => {
  const { id, name, segment, ltv, engagementScore } = req.body;
  const record = { id: uuidv4(), id, name, segment, ltv, engagementScore, createdAt: new Date() };
  customers.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/customers/:id', (req, res) => {
  const idx = customers.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  customers[idx] = { ...customers[idx], ...req.body };
  res.json(customers[idx]);
});

// DELETE
app.delete('/api/customers/:id', (req, res) => {
  customers = customers.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '186', name: 'Online SaaS Customer Engagement Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🤝  Project #186: Online SaaS Customer Engagement Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
