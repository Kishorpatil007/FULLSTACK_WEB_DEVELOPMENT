const form = document.getElementById("resourceForm")
const resourceListDiv = document.getElementById("resourceList")

async function fetchResources() {
  const res = await fetch("/resources")
  const resources = await res.json()
  resourceListDiv.innerHTML = ""
  resources.forEach(r => {
    const div = document.createElement("div")
    div.className = "resource"
    div.innerHTML = `
      <strong>${r.title}</strong> by ${r.author} <br>
      Category: ${r.category} <br>
      <a href="${r.link}" target="_blank">View Resource</a>
    `
    resourceListDiv.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    link: document.getElementById("link").value,
    category: document.getElementById("category").value
  }
  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  form.reset()
  fetchResources()
})

fetchResources()