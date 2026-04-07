async function uploadImage() {
    const fileInput = document.getElementById("imageInput")
    const file = fileInput.files[0]

    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    document.getElementById("status").innerText = "Compressing..."

    const res = await fetch("/compress", {
        method: "POST",
        body: formData
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "compressed.jpg"
    a.click()

    document.getElementById("status").innerText = "Download complete"
}