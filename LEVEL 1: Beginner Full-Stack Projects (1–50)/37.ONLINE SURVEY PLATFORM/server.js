const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let responses = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/responses", (req, res) => {
  res.json(responses)
})

app.post("/submit", (req, res) => {
  const { name, email, satisfaction, suggestions } = req.body
  responses.push({ name, email, satisfaction, suggestions })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})