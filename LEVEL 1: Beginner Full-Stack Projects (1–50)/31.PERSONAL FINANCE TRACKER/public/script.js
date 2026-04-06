const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")
const type = document.getElementById("type")
const list = document.getElementById("list")
const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")

let transactions = []

async function fetchData() {
  const res = await fetch("/transactions")
  transactions = await res.json()
  updateUI()
}

function updateUI() {
  list.innerHTML = ""

  let inc = 0
  let exp = 0

  transactions.forEach(t => {
    const li = document.createElement("li")
    li.classList.add(t.type)
    li.innerHTML = `${t.text} <span>₹${t.amount}</span>`
    list.appendChild(li)

    if (t.type === "income") inc += t.amount
    else exp += t.amount
  })

  balance.innerText = inc - exp
  income.innerText = inc
  expense.innerText = exp
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = {
    text: text.value,
    amount: +amount.value,
    type: type.value
  }

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  text.value = ""
  amount.value = ""

  fetchData()
})

fetchData()