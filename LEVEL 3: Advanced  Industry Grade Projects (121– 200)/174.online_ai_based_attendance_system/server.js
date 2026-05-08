const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let students = [];

// GET all
app.get('/api/students', (req, res) => res.json(students));

// POST create
app.post('/api/students', (req, res) => {
  const { id, name, class, rollNo } = req.body;
  const record = { id: uuidv4(), id, name, class, rollNo, createdAt: new Date() };
  students.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/students/:id', (req, res) => {
  const idx = students.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  students[idx] = { ...students[idx], ...req.body };
  res.json(students[idx]);
});

// DELETE
app.delete('/api/students/:id', (req, res) => {
  students = students.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '174', name: 'Online AI-Based Attendance System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📋  Project #174: Online AI-Based Attendance System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
