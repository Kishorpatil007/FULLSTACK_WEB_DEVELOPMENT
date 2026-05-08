const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let conversations = [];

// GET all
app.get('/api/conversations', (req, res) => res.json(conversations));

// POST create
app.post('/api/conversations', (req, res) => {
  const { id, channel, messages, sentiment, topics } = req.body;
  const record = { id: uuidv4(), id, channel, messages, sentiment, topics, createdAt: new Date() };
  conversations.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/conversations/:id', (req, res) => {
  const idx = conversations.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  conversations[idx] = { ...conversations[idx], ...req.body };
  res.json(conversations[idx]);
});

// DELETE
app.delete('/api/conversations/:id', (req, res) => {
  conversations = conversations.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '180', name: 'Online AI-Powered Chat Analytics Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  💬  Project #180: Online AI-Powered Chat Analytics Platfor');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
