const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let notices = [];

app.get('/api/notices', (req, res) => {
    res.json(notices);
});

app.post('/api/notices', (req, res) => {
    const { title, description } = req.body;
    if(title && description){
        const notice = { id: Date.now(), title, description, timestamp: new Date() };
        notices.unshift(notice);
        res.json(notice);
    } else {
        res.status(400).json({ error: 'Invalid notice data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});