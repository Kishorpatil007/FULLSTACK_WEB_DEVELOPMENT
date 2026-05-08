const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let users = [];

// GET all
app.get('/api/users', (req, res) => res.json(users));

// POST create
app.post('/api/users', (req, res) => {
  const { id, preferences, history } = req.body;
  const record = { id: uuidv4(), id, preferences, history, createdAt: new Date() };
  users.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json(users[idx]);
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '158', name: 'Online AI-Powered Recommendation Engine' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎯  Project #158: Online AI-Powered Recommendation Engine');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
