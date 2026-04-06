const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

let resources = []

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/resources", (req, res) => res.json(resources))

app.post("/add", (req, res) => {
  const { title, author, link, category } = req.body
  resources.push({ title, author, link, category })
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
