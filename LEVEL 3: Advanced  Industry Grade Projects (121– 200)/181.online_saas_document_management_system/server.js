const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let documents = [];

// GET all
app.get('/api/documents', (req, res) => res.json(documents));

// POST create
app.post('/api/documents', (req, res) => {
  const { id, name, type, folderId, owner } = req.body;
  const record = { id: uuidv4(), id, name, type, folderId, owner, createdAt: new Date() };
  documents.push(record);
  res.status(201).json(record);
});

// PUT update
app.put('/api/documents/:id', (req, res) => {
  const idx = documents.findIndex(r => r.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  documents[idx] = { ...documents[idx], ...req.body };
  res.json(documents[idx]);
});

// DELETE
app.delete('/api/documents/:id', (req, res) => {
  documents = documents.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: '181', name: 'Online SaaS Document Management System' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  📄  Project #181: Online SaaS Document Management System');
  console.log(`║  🚀 Running at http://localhost:${PORT}`);
  console.log('╚══════════════════════════════════════════════════════╝\n');
});
