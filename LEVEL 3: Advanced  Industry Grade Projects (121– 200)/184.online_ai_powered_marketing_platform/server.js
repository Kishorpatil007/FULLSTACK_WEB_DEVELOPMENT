const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let campaigns = [];

// GET all
app.get('/api/campaigns', (req, res) => res.json(campaigns));

// POST create
app.post('/api/campaigns', (req, res) => {
  const { id, name, type, budget, status } = req.body;
  const record = { id: uuidv4(), id, name, type, budget, status, createdAt: new Date() };
  campaigns.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/campaigns/:id', (req, res) => {
  const idx = campaigns.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  campaigns[idx] = { ...campaigns[idx], ...req.body };
  res.json(campaigns[idx]);
});

// DELETE
app.delete('/api/campaigns/:id', (req, res) => {
  campaigns = campaigns.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '184', name: 'Online AI-Powered Marketing Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📣  Project #184: Online AI-Powered Marketing Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
