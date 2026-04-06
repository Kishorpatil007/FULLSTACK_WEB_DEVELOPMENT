const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let donors = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/donors", (req, res) => {
  res.json(donors)
})

app.post("/add", (req, res) => {
  const { name, age, blood, contact } = req.body
  donors.push({ name, age, blood, contact })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})