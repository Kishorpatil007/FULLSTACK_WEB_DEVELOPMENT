const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const { PDFDocument } = require("pdf-lib")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.static("public"))

const upload = multer({ dest: "uploads/" })

app.post("/merge", upload.array("pdfs"), async (req, res) => {
    const mergedPdf = await PDFDocument.create()

    for (let file of req.files) {
        const data = fs.readFileSync(file.path)
        const pdf = await PDFDocument.load(data)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach(page => mergedPdf.addPage(page))
        fs.unlinkSync(file.path)
    }

    const mergedBytes = await mergedPdf.save()
    const outputPath = `uploads/merged-${Date.now()}.pdf`
    fs.writeFileSync(outputPath, mergedBytes)

    res.download(outputPath, () => {
        fs.unlinkSync(outputPath)
    })
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))