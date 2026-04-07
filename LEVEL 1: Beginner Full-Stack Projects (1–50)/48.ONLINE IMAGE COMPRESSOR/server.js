const express = require("express")
const cors = require("cors")
const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.static("public"))

const upload = multer({ dest: "uploads/" })

app.post("/compress", upload.single("image"), async (req, res) => {
    const inputPath = req.file.path
    const outputPath = "uploads/compressed-" + Date.now() + ".jpg"

    await sharp(inputPath)
        .jpeg({ quality: 50 })
        .toFile(outputPath)

    fs.unlinkSync(inputPath)

    res.download(outputPath, () => {
        fs.unlinkSync(outputPath)
    })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))