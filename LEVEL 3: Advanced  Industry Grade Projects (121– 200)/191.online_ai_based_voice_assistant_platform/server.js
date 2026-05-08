const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let sessions = [];

// GET all
app.get('/api/sessions', (req, res) => res.json(sessions));

// POST create
app.post('/api/sessions', (req, res) => {
  const { id, userId, commands, duration } = req.body;
  const record = { id: uuidv4(), id, userId, commands, duration, createdAt: new Date() };
  sessions.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/sessions/:id', (req, res) => {
  const idx = sessions.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  sessions[idx] = { ...sessions[idx], ...req.body };
  res.json(sessions[idx]);
});

// DELETE
app.delete('/api/sessions/:id', (req, res) => {
  sessions = sessions.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '191', name: 'Online AI-Based Voice Assistant Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎙️  Project #191: Online AI-Based Voice Assistant Platform');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
