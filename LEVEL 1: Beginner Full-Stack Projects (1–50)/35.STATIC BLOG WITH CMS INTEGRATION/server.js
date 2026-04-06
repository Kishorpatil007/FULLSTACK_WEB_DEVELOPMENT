const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, "public")))

app.get("/posts", (req, res) => {
  const postsPath = path.join(__dirname, "cms", "posts.json")
  fs.readFile(postsPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading posts")
    res.json(JSON.parse(data))
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})