const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let automations = [];

// GET all
app.get('/api/automations', (req, res) => res.json(automations));

// POST create
app.post('/api/automations', (req, res) => {
  const { id, name, trigger, steps, status } = req.body;
  const record = { id: uuidv4(), id, name, trigger, steps, status, createdAt: new Date() };
  automations.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/automations/:id', (req, res) => {
  const idx = automations.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  automations[idx] = { ...automations[idx], ...req.body };
  res.json(automations[idx]);
});

// DELETE
app.delete('/api/automations/:id', (req, res) => {
  automations = automations.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '199', name: 'Online SaaS Business Automation Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🤖  Project #199: Online SaaS Business Automation Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
