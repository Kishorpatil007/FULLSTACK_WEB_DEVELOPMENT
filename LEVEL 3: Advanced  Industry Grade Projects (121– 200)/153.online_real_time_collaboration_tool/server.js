const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let rooms = [];

// GET all
app.get('/api/rooms', (req, res) => res.json(rooms));

// POST create
app.post('/api/rooms', (req, res) => {
  const { id, name, users, createdAt } = req.body;
  const record = { id: uuidv4(), id, name, users, createdAt, createdAt: new Date() };
  rooms.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/rooms/:id', (req, res) => {
  const idx = rooms.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  rooms[idx] = { ...rooms[idx], ...req.body };
  res.json(rooms[idx]);
});

// DELETE
app.delete('/api/rooms/:id', (req, res) => {
  rooms = rooms.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '153', name: 'Online Real-Time Collaboration Tool' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🤝  Project #153: Online Real-Time Collaboration Tool');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
