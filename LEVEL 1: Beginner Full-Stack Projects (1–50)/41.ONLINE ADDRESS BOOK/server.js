const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let contacts = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/contacts", (req, res) => res.json(contacts))

app.post("/add", (req, res) => {
  const { name, email, phone } = req.body
  contacts.push({ name, email, phone })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})