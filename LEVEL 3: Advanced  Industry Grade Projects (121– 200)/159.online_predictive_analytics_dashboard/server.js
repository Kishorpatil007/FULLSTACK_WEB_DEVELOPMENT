const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let models = [];

// GET all
app.get('/api/models', (req, res) => res.json(models));

// POST create
app.post('/api/models', (req, res) => {
  const { id, name, accuracy, status, type } = req.body;
  const record = { id: uuidv4(), id, name, accuracy, status, type, createdAt: new Date() };
  models.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/models/:id', (req, res) => {
  const idx = models.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  models[idx] = { ...models[idx], ...req.body };
  res.json(models[idx]);
});

// DELETE
app.delete('/api/models/:id', (req, res) => {
  models = models.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '159', name: 'Online Predictive Analytics Dashboard' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📈  Project #159: Online Predictive Analytics Dashboard');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
