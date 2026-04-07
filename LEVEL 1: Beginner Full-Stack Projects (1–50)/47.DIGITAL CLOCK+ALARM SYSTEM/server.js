const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let alarms = []

app.get("/alarms", (req, res) => {
    res.json(alarms)
})

app.post("/alarms", (req, res) => {
    alarms.push(req.body)
    res.json({ success: true })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))