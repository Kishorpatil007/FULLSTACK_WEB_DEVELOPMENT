const form = document.getElementById("surveyForm")
const responsesDiv = document.getElementById("responses")

async function fetchResponses() {
  const res = await fetch("/responses")
  const responses = await res.json()
  responsesDiv.innerHTML = ""
  responses.forEach(r => {
    const div = document.createElement("div")
    div.className = "response"
    div.innerHTML = `
      <strong>${r.name} (${r.email})</strong><br>
      Satisfaction: ${r.satisfaction}<br>
      Suggestions: ${r.suggestions || "N/A"}
    `
    responsesDiv.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    satisfaction: document.getElementById("satisfaction").value,
    suggestions: document.getElementById("suggestions").value
  }
  await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  form.reset()
  fetchResponses()
})

fetchResponses()