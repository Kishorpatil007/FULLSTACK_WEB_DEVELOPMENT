const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let transactions = [];

// GET all
app.get('/api/transactions', (req, res) => res.json(transactions));

// POST create
app.post('/api/transactions', (req, res) => {
  const { id, amount, user, merchant, timestamp } = req.body;
  const record = { id: uuidv4(), id, amount, user, merchant, timestamp, createdAt: new Date() };
  transactions.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/transactions/:id', (req, res) => {
  const idx = transactions.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  transactions[idx] = { ...transactions[idx], ...req.body };
  res.json(transactions[idx]);
});

// DELETE
app.delete('/api/transactions/:id', (req, res) => {
  transactions = transactions.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '169', name: 'Online AI-Based Fraud Analytics' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🛡️  Project #169: Online AI-Based Fraud Analytics');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
