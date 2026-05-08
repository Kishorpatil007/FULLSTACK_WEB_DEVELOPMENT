const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let videos = [];

// GET all
app.get('/api/videos', (req, res) => res.json(videos));

// POST create
app.post('/api/videos', (req, res) => {
  const { id, url, duration, status, processed } = req.body;
  const record = { id: uuidv4(), id, url, duration, status, processed, createdAt: new Date() };
  videos.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/videos/:id', (req, res) => {
  const idx = videos.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  videos[idx] = { ...videos[idx], ...req.body };
  res.json(videos[idx]);
});

// DELETE
app.delete('/api/videos/:id', (req, res) => {
  videos = videos.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '193', name: 'Online AI-Powered Video Analytics Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎥  Project #193: Online AI-Powered Video Analytics Platfo');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
