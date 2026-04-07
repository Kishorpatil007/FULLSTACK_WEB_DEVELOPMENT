const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let poll = {
    question: "Which technology do you prefer?",
    options: [
        { id: 1, text: "JavaScript", votes: 0 },
        { id: 2, text: "Python", votes: 0 },
        { id: 3, text: "Java", votes: 0 },
        { id: 4, text: "C++", votes: 0 }
    ]
}

app.get("/poll", (req, res) => {
    res.json(poll)
})

app.post("/vote", (req, res) => {
    const { optionId } = req.body
    poll.options = poll.options.map(o => {
        if (o.id === optionId) o.votes++
        return o
    })
    res.json({ success: true })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))