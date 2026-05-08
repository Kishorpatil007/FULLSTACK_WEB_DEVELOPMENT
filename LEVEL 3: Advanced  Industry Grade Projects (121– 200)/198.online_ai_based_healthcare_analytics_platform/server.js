const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let patients = [];

// GET all
app.get('/api/patients', (req, res) => res.json(patients));

// POST create
app.post('/api/patients', (req, res) => {
  const { id, demographics, conditions, outcomes } = req.body;
  const record = { id: uuidv4(), id, demographics, conditions, outcomes, createdAt: new Date() };
  patients.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/patients/:id', (req, res) => {
  const idx = patients.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  patients[idx] = { ...patients[idx], ...req.body };
  res.json(patients[idx]);
});

// DELETE
app.delete('/api/patients/:id', (req, res) => {
  patients = patients.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '198', name: 'Online AI-Based Healthcare Analytics Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🏥  Project #198: Online AI-Based Healthcare Analytics Pla');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
