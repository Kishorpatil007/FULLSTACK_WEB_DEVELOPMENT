const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// --- In-memory data store ---
let records = [];

// GET all
app.get('/api/records', (req, res) => res.json(records));

// POST create
app.post('/api/records', (req, res) => {
    const record = { id: uuidv4(), ...req.body, createdAt: new Date() };
    records.push(record);
    res.status(201).json(record);
});

// DELETE
app.delete('/api/records/:id', (req, res) => {
    records = records.filter(r => r.id !== req.params.id);
    res.json({ success: true });
});

// PUT update
app.put('/api/records/:id', (req, res) => {
    const idx = records.findIndex(r => r.id === req.params.id);
    if (idx !== -1) {
        records[idx] = { ...records[idx], ...req.body };
        res.json(records[idx]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n╔══════════════════════════════════════════╗');
    console.log(`║  🚀 Multi-Vendor Store                  ║`);
    console.log(`║  📡 http://localhost:${PORT}                 ║`);
    console.log('╚══════════════════════════════════════════╝\n');
});
