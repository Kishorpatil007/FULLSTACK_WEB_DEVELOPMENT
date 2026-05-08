const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let tickets = [];

// GET all
app.get('/api/tickets', (req, res) => res.json(tickets));

// POST create
app.post('/api/tickets', (req, res) => {
  const { id, title, priority, status, agentId } = req.body;
  const record = { id: uuidv4(), id, title, priority, status, agentId, createdAt: new Date() };
  tickets.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/tickets/:id', (req, res) => {
  const idx = tickets.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  tickets[idx] = { ...tickets[idx], ...req.body };
  res.json(tickets[idx]);
});

// DELETE
app.delete('/api/tickets/:id', (req, res) => {
  tickets = tickets.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '168', name: 'Online SaaS Helpdesk System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎫  Project #168: Online SaaS Helpdesk System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
