const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let exams = [];

// GET all
app.get('/api/exams', (req, res) => res.json(exams));

// POST create
app.post('/api/exams', (req, res) => {
  const { id, title, questions, duration } = req.body;
  const record = { id: uuidv4(), id, title, questions, duration, createdAt: new Date() };
  exams.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/exams/:id', (req, res) => {
  const idx = exams.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  exams[idx] = { ...exams[idx], ...req.body };
  res.json(exams[idx]);
});

// DELETE
app.delete('/api/exams/:id', (req, res) => {
  exams = exams.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '156', name: 'Online AI-Based Exam Evaluation System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📝  Project #156: Online AI-Based Exam Evaluation System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
