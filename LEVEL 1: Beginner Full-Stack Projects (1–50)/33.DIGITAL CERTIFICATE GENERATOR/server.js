const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))

app.post("/generate", (req, res) => {
  const { name, course } = req.body

  const today = new Date().toLocaleDateString()

  res.json({
    name,
    course,
    date: today
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})