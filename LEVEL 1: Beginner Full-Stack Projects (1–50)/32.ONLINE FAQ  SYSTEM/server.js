const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let faqs = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/faqs", (req, res) => {
  res.json(faqs)
})

app.post("/add", (req, res) => {
  const { question, answer } = req.body
  faqs.push({ question, answer })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})