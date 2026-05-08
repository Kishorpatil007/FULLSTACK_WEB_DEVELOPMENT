const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let pipelines = [];

// GET all
app.get('/api/pipelines', (req, res) => res.json(pipelines));

// POST create
app.post('/api/pipelines', (req, res) => {
  const { id, name, repo, status, branch } = req.body;
  const record = { id: uuidv4(), id, name, repo, status, branch, createdAt: new Date() };
  pipelines.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/pipelines/:id', (req, res) => {
  const idx = pipelines.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  pipelines[idx] = { ...pipelines[idx], ...req.body };
  res.json(pipelines[idx]);
});

// DELETE
app.delete('/api/pipelines/:id', (req, res) => {
  pipelines = pipelines.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '163', name: 'Online DevOps Monitoring Dashboard' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🔧  Project #163: Online DevOps Monitoring Dashboard');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
