const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let goals = [];

// GET all
app.get('/api/goals', (req, res) => res.json(goals));

// POST create
app.post('/api/goals', (req, res) => {
  const { id, name, target, current, deadline } = req.body;
  const record = { id: uuidv4(), id, name, target, current, deadline, createdAt: new Date() };
  goals.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/goals/:id', (req, res) => {
  const idx = goals.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  goals[idx] = { ...goals[idx], ...req.body };
  res.json(goals[idx]);
});

// DELETE
app.delete('/api/goals/:id', (req, res) => {
  goals = goals.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '182', name: 'Online SaaS Financial Planning Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  💰  Project #182: Online SaaS Financial Planning Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
