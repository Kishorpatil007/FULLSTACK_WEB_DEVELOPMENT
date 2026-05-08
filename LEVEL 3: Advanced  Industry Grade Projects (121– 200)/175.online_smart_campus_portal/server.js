const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let departments = [];

// GET all
app.get('/api/departments', (req, res) => res.json(departments));

// POST create
app.post('/api/departments', (req, res) => {
  const { id, name, head, students, rooms } = req.body;
  const record = { id: uuidv4(), id, name, head, students, rooms, createdAt: new Date() };
  departments.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/departments/:id', (req, res) => {
  const idx = departments.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  departments[idx] = { ...departments[idx], ...req.body };
  res.json(departments[idx]);
});

// DELETE
app.delete('/api/departments/:id', (req, res) => {
  departments = departments.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '175', name: 'Online Smart Campus Portal' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🏛️  Project #175: Online Smart Campus Portal');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
