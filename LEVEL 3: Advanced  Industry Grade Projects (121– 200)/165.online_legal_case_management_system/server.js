const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let cases = [];

// GET all
app.get('/api/cases', (req, res) => res.json(cases));

// POST create
app.post('/api/cases', (req, res) => {
  const { id, title, type, status, clientId } = req.body;
  const record = { id: uuidv4(), id, title, type, status, clientId, createdAt: new Date() };
  cases.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/cases/:id', (req, res) => {
  const idx = cases.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  cases[idx] = { ...cases[idx], ...req.body };
  res.json(cases[idx]);
});

// DELETE
app.delete('/api/cases/:id', (req, res) => {
  cases = cases.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '165', name: 'Online Legal Case Management System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  ⚖️  Project #165: Online Legal Case Management System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
