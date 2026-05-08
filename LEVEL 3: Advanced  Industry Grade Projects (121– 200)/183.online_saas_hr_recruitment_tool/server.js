const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let jobs = [];

// GET all
app.get('/api/jobs', (req, res) => res.json(jobs));

// POST create
app.post('/api/jobs', (req, res) => {
  const { id, title, dept, skills, status } = req.body;
  const record = { id: uuidv4(), id, title, dept, skills, status, createdAt: new Date() };
  jobs.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  jobs[idx] = { ...jobs[idx], ...req.body };
  res.json(jobs[idx]);
});

// DELETE
app.delete('/api/jobs/:id', (req, res) => {
  jobs = jobs.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '183', name: 'Online SaaS HR Recruitment Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  💼  Project #183: Online SaaS HR Recruitment Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
