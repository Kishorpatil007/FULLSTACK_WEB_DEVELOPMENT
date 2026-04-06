const form = document.getElementById("resultForm")
const resultList = document.getElementById("resultList")

async function fetchResults() {
  const res = await fetch("/results")
  const results = await res.json()

  resultList.innerHTML = ""

  results.forEach(r => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${r.roll}</td>
      <td>${r.math}</td>
      <td>${r.science}</td>
      <td>${r.english}</td>
      <td>${r.total}</td>
      <td>${r.percentage}%</td>
    `
    resultList.appendChild(tr)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = {
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    math: +document.getElementById("math").value,
    science: +document.getElementById("science").value,
    english: +document.getElementById("english").value
  }

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  form.reset()
  fetchResults()
})

fetchResults()