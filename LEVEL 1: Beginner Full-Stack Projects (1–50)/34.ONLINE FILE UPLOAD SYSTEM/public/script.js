const form = document.getElementById("uploadForm")
const fileInput = document.getElementById("file")
const fileList = document.getElementById("fileList")

async function fetchFiles() {
  const res = await fetch("/files")
  const files = await res.json()

  fileList.innerHTML = ""

  files.forEach(file => {
    const li = document.createElement("li")
    const link = document.createElement("a")
    link.href = "/uploads/" + file
    link.innerText = file
    link.target = "_blank"

    li.appendChild(link)
    fileList.appendChild(li)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append("file", fileInput.files[0])

  await fetch("/upload", {
    method: "POST",
    body: formData
  })

  fileInput.value = ""
  fetchFiles()
})

fetchFiles()