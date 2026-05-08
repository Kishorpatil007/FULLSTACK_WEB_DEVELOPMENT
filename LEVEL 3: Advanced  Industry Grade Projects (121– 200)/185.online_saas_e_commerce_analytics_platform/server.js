const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let sales = [];

// GET all
app.get('/api/sales', (req, res) => res.json(sales));

// POST create
app.post('/api/sales', (req, res) => {
  const { id, orderId, amount, date, channel } = req.body;
  const record = { id: uuidv4(), id, orderId, amount, date, channel, createdAt: new Date() };
  sales.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/sales/:id', (req, res) => {
  const idx = sales.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  sales[idx] = { ...sales[idx], ...req.body };
  res.json(sales[idx]);
});

// DELETE
app.delete('/api/sales/:id', (req, res) => {
  sales = sales.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '185', name: 'Online SaaS E-Commerce Analytics Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🏪  Project #185: Online SaaS E-Commerce Analytics Platfor');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
