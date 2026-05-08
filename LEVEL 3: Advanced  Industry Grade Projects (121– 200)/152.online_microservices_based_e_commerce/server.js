const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let products = [];

// GET all
app.get('/api/products', (req, res) => res.json(products));

// POST create
app.post('/api/products', (req, res) => {
  const { id, name, price, stock, category } = req.body;
  const record = { id: uuidv4(), id, name, price, stock, category, createdAt: new Date() };
  products.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '152', name: 'Online Microservices-Based E-Commerce' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🛒  Project #152: Online Microservices-Based E-Commerce');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
