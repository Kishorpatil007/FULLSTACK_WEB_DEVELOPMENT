const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let decisions = [];

// GET all
app.get('/api/decisions', (req, res) => res.json(decisions));

// POST create
app.post('/api/decisions', (req, res) => {
  const { id, title, options, recommendation, outcome } = req.body;
  const record = { id: uuidv4(), id, title, options, recommendation, outcome, createdAt: new Date() };
  decisions.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/decisions/:id', (req, res) => {
  const idx = decisions.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  decisions[idx] = { ...decisions[idx], ...req.body };
  res.json(decisions[idx]);
});

// DELETE
app.delete('/api/decisions/:id', (req, res) => {
  decisions = decisions.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '200', name: 'Online AI-Driven Enterprise Decision Support System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🧠  Project #200: Online AI-Driven Enterprise Decision Sup');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
