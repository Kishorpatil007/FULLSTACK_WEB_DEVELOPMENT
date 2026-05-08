const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let logs = [];

// GET all
app.get('/api/logs', (req, res) => res.json(logs));

// POST create
app.post('/api/logs', (req, res) => {
  const { id, service, level, message, timestamp } = req.body;
  const record = { id: uuidv4(), id, service, level, message, timestamp, createdAt: new Date() };
  logs.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/logs/:id', (req, res) => {
  const idx = logs.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  logs[idx] = { ...logs[idx], ...req.body };
  res.json(logs[idx]);
});

// DELETE
app.delete('/api/logs/:id', (req, res) => {
  logs = logs.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '188', name: 'Online SaaS Log Monitoring System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📋  Project #188: Online SaaS Log Monitoring System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
