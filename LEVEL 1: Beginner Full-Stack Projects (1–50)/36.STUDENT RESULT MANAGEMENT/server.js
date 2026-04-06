const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let results = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/results", (req, res) => {
  res.json(results)
})

app.post("/add", (req, res) => {
  const { name, roll, math, science, english } = req.body
  const total = math + science + english
  const percentage = ((total / 300) * 100).toFixed(2)
  results.push({ name, roll, math, science, english, total, percentage })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})