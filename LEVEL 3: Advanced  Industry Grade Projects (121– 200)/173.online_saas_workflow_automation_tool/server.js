const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let workflows = [];

// GET all
app.get('/api/workflows', (req, res) => res.json(workflows));

// POST create
app.post('/api/workflows', (req, res) => {
  const { id, name, trigger, steps, status } = req.body;
  const record = { id: uuidv4(), id, name, trigger, steps, status, createdAt: new Date() };
  workflows.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/workflows/:id', (req, res) => {
  const idx = workflows.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  workflows[idx] = { ...workflows[idx], ...req.body };
  res.json(workflows[idx]);
});

// DELETE
app.delete('/api/workflows/:id', (req, res) => {
  workflows = workflows.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '173', name: 'Online SaaS Workflow Automation Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ⚙️  Project #173: Online SaaS Workflow Automation Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
