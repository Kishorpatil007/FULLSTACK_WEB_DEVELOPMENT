const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let posts = [];

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const { username, content } = req.body;
    if(username && content){
        const post = { id: Date.now(), username, content, timestamp: new Date() };
        posts.unshift(post);
        res.json(post);
    } else {
        res.status(400).json({ error: 'Invalid post data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
