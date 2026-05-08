const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let images = [];

// GET all
app.get('/api/images', (req, res) => res.json(images));

// POST create
app.post('/api/images', (req, res) => {
  const { id, url, size, format, processed } = req.body;
  const record = { id: uuidv4(), id, url, size, format, processed, createdAt: new Date() };
  images.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/images/:id', (req, res) => {
  const idx = images.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  images[idx] = { ...images[idx], ...req.body };
  res.json(images[idx]);
});

// DELETE
app.delete('/api/images/:id', (req, res) => {
  images = images.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '187', name: 'Online AI-Based Image Processing Platform' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🖼️  Project #187: Online AI-Based Image Processing Platfor');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
