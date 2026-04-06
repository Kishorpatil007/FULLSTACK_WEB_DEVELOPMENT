const form = document.getElementById("form")
const nameInput = document.getElementById("name")
const courseInput = document.getElementById("course")
const cname = document.getElementById("cname")
const ccourse = document.getElementById("ccourse")
const date = document.getElementById("date")
const downloadBtn = document.getElementById("downloadBtn")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = {
    name: nameInput.value,
    course: courseInput.value
  }

  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  cname.innerText = result.name
  ccourse.innerText = result.course
  date.innerText = result.date
})

downloadBtn.addEventListener("click", () => {
  window.print()
})