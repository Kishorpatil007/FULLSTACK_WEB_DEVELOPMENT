const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let employees = [];

// GET all
app.get('/api/employees', (req, res) => res.json(employees));

// POST create
app.post('/api/employees', (req, res) => {
  const { id, name, dept, salary, joiningDate } = req.body;
  const record = { id: uuidv4(), id, name, dept, salary, joiningDate, createdAt: new Date() };
  employees.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/employees/:id', (req, res) => {
  const idx = employees.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  employees[idx] = { ...employees[idx], ...req.body };
  res.json(employees[idx]);
});

// DELETE
app.delete('/api/employees/:id', (req, res) => {
  employees = employees.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '161', name: 'Online SaaS HR Analytics Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  👥  Project #161: Online SaaS HR Analytics Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
