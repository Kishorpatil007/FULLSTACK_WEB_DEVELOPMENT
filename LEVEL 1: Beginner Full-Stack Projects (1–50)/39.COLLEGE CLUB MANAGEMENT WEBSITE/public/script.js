const clubList = document.getElementById("clubList")
const clubSelect = document.getElementById("club")
const memberListDiv = document.getElementById("memberList")
const memberForm = document.getElementById("memberForm")

async function fetchClubs() {
  const res = await fetch("/clubs")
  const clubs = await res.json()
  clubList.innerHTML = ""
  clubSelect.innerHTML = "<option value=''>Select Club</option>"

  clubs.forEach(c => {
    const li = document.createElement("li")
    li.innerText = c
    clubList.appendChild(li)

    const option = document.createElement("option")
    option.value = c
    option.innerText = c
    clubSelect.appendChild(option)
  })
}

async function fetchMembers() {
  const res = await fetch("/members")
  const members = await res.json()
  memberListDiv.innerHTML = ""
  members.forEach(m => {
    const div = document.createElement("div")
    div.className = "member"
    div.innerHTML = `<strong>${m.name}</strong> (${m.email}) - ${m.club}`
    memberListDiv.appendChild(div)
  })
}

memberForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    club: document.getElementById("club").value
  }
  await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  memberForm.reset()
  fetchMembers()
})

fetchClubs()
fetchMembers()