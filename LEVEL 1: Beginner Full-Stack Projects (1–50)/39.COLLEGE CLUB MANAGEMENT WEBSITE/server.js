const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

const clubs = ["Coding Club", "Drama Club", "Music Club", "Sports Club"]
let members = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/clubs", (req, res) => res.json(clubs))

app.get("/members", (req, res) => res.json(members))

app.post("/register", (req, res) => {
  const { name, email, club } = req.body
  members.push({ name, email, club })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})