const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let courses = [];

// GET all
app.get('/api/courses', (req, res) => res.json(courses));

// POST create
app.post('/api/courses', (req, res) => {
  const { id, title, instructor, modules, price } = req.body;
  const record = { id: uuidv4(), id, title, instructor, modules, price, createdAt: new Date() };
  courses.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/courses/:id', (req, res) => {
  const idx = courses.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  courses[idx] = { ...courses[idx], ...req.body };
  res.json(courses[idx]);
});

// DELETE
app.delete('/api/courses/:id', (req, res) => {
  courses = courses.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '155', name: 'Online SaaS LMS Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎓  Project #155: Online SaaS LMS Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
