const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let event = {
    name: "New Year 2027",
    date: "2027-01-01T00:00:00"
}

app.get("/event", (req, res) => {
    res.json(event)
})

app.post("/event", (req, res) => {
    event = req.body
    res.json({ success: true })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))