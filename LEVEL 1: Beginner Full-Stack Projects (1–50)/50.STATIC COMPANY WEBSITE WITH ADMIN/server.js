const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let content = {
    homeTitle: "Welcome to Our Company",
    aboutText: "We deliver innovative solutions to clients worldwide.",
    services: [
        "Web Development",
        "Mobile Apps",
        "UI/UX Design"
    ]
}

app.get("/content", (req, res) => res.json(content))

app.post("/content", (req, res) => {
    content = req.body
    res.json({ success: true })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))