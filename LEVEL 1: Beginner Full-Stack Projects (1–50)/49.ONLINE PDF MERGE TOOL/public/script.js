async function mergePDFs() {
    const input = document.getElementById("pdfInput")
    const files = input.files
    if (!files.length) return

    const formData = new FormData()
    for (let f of files) formData.append("pdfs", f)

    document.getElementById("status").innerText = "Merging PDFs..."

    const res = await fetch("/merge", {
        method: "POST",
        body: formData
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "merged.pdf"
    a.click()

    document.getElementById("status").innerText = "Download ready!"
}