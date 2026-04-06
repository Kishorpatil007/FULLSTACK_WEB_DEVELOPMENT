const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let transactions = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/transactions", (req, res) => {
  res.json(transactions)
})

app.post("/add", (req, res) => {
  const { text, amount, type } = req.body
  transactions.push({ text, amount, type })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})