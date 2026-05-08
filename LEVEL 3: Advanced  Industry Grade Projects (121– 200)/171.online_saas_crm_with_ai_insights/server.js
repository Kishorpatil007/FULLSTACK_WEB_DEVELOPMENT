const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let leads = [];

// GET all
app.get('/api/leads', (req, res) => res.json(leads));

// POST create
app.post('/api/leads', (req, res) => {
  const { id, name, email, status, score } = req.body;
  const record = { id: uuidv4(), id, name, email, status, score, createdAt: new Date() };
  leads.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/leads/:id', (req, res) => {
  const idx = leads.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  leads[idx] = { ...leads[idx], ...req.body };
  res.json(leads[idx]);
});

// DELETE
app.delete('/api/leads/:id', (req, res) => {
  leads = leads.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '171', name: 'Online SaaS CRM with AI Insights' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📊  Project #171: Online SaaS CRM with AI Insights');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
