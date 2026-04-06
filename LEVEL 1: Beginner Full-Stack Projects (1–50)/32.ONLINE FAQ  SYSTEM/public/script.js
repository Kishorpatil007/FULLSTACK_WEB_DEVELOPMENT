const form = document.getElementById("faqForm")
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const faqList = document.getElementById("faqList")

let faqs = []

async function fetchFAQs() {
  const res = await fetch("/faqs")
  faqs = await res.json()
  displayFAQs()
}

function displayFAQs() {
  faqList.innerHTML = ""

  faqs.forEach(faq => {
    const div = document.createElement("div")
    div.className = "faq"

    const q = document.createElement("div")
    q.className = "question"
    q.innerText = faq.question

    const a = document.createElement("div")
    a.className = "answer"
    a.innerText = faq.answer

    q.addEventListener("click", () => {
      a.style.display = a.style.display === "block" ? "none" : "block"
    })

    div.appendChild(q)
    div.appendChild(a)
    faqList.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = {
    question: question.value,
    answer: answer.value
  }

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  question.value = ""
  answer.value = ""

  fetchFAQs()
})

fetchFAQs()