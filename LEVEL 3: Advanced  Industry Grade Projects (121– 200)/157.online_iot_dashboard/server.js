const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let devices = [];

// GET all
app.get('/api/devices', (req, res) => res.json(devices));

// POST create
app.post('/api/devices', (req, res) => {
  const { id, name, type, status, location } = req.body;
  const record = { id: uuidv4(), id, name, type, status, location, createdAt: new Date() };
  devices.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/devices/:id', (req, res) => {
  const idx = devices.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  devices[idx] = { ...devices[idx], ...req.body };
  res.json(devices[idx]);
});

// DELETE
app.delete('/api/devices/:id', (req, res) => {
  devices = devices.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '157', name: 'Online IoT Dashboard' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🌐  Project #157: Online IoT Dashboard');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
