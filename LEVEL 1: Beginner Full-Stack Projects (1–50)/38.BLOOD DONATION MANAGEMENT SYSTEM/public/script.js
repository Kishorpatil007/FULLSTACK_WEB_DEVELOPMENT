const form = document.getElementById("donorForm")
const donorListDiv = document.getElementById("donorList")

async function fetchDonors() {
  const res = await fetch("/donors")
  const donors = await res.json()
  donorListDiv.innerHTML = ""
  donors.forEach(d => {
    const div = document.createElement("div")
    div.className = "donor"
    div.innerHTML = `
      <strong>${d.name}</strong> (${d.age} yrs) - ${d.blood}<br>
      Contact: ${d.contact}
    `
    donorListDiv.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    name: document.getElementById("name").value,
    age: +document.getElementById("age").value,
    blood: document.getElementById("blood").value,
    contact: document.getElementById("contact").value
  }
  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  form.reset()
  fetchDonors()
})

fetchDonors()