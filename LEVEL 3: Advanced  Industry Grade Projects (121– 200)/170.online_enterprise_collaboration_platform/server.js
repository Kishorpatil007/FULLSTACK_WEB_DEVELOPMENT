const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let channels = [];

// GET all
app.get('/api/channels', (req, res) => res.json(channels));

// POST create
app.post('/api/channels', (req, res) => {
  const { id, name, type, team, members } = req.body;
  const record = { id: uuidv4(), id, name, type, team, members, createdAt: new Date() };
  channels.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/channels/:id', (req, res) => {
  const idx = channels.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  channels[idx] = { ...channels[idx], ...req.body };
  res.json(channels[idx]);
});

// DELETE
app.delete('/api/channels/:id', (req, res) => {
  channels = channels.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '170', name: 'Online Enterprise Collaboration Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🏢  Project #170: Online Enterprise Collaboration Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
