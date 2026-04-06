const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const app = express()
const PORT = 3000

const uploadPath = path.join(__dirname, "uploads")

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(uploadPath))

app.post("/upload", upload.single("file"), (req, res) => {
  res.sendStatus(200)
})

app.get("/files", (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    res.json(files)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})