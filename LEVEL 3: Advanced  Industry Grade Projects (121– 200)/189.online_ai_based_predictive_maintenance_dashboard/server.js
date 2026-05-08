const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let equipment = [];

// GET all
app.get('/api/equipment', (req, res) => res.json(equipment));

// POST create
app.post('/api/equipment', (req, res) => {
  const { id, name, type, location, status } = req.body;
  const record = { id: uuidv4(), id, name, type, location, status, createdAt: new Date() };
  equipment.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/equipment/:id', (req, res) => {
  const idx = equipment.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  equipment[idx] = { ...equipment[idx], ...req.body };
  res.json(equipment[idx]);
});

// DELETE
app.delete('/api/equipment/:id', (req, res) => {
  equipment = equipment.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '189', name: 'Online AI-Based Predictive Maintenance Dashboard' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🔮  Project #189: Online AI-Based Predictive Maintenance D');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
