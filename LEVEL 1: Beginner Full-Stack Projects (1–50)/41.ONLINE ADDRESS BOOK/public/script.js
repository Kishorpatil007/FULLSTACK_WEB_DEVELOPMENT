const form = document.getElementById("contactForm")
const contactListDiv = document.getElementById("contactList")

async function fetchContacts() {
  const res = await fetch("/contacts")
  const contacts = await res.json()
  contactListDiv.innerHTML = ""
  contacts.forEach(c => {
    const div = document.createElement("div")
    div.className = "contact"
    div.innerHTML = `
      <strong>${c.name}</strong><br>
      Email: ${c.email}<br>
      Phone: ${c.phone}
    `
    contactListDiv.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  }
  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  form.reset()
  fetchContacts()
})

fetchContacts()