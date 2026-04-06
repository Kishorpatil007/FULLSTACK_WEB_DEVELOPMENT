const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let tasks = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/tasks", (req, res) => res.json(tasks))

app.post("/add", (req, res) => {
  const { task, date } = req.body
  tasks.push({ task, date })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})