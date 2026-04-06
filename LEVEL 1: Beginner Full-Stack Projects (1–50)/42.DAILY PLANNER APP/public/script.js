const form = document.getElementById("taskForm")
const taskListDiv = document.getElementById("taskList")

async function fetchTasks() {
  const res = await fetch("/tasks")
  const tasks = await res.json()
  taskListDiv.innerHTML = ""
  tasks.forEach(t => {
    const div = document.createElement("div")
    div.className = "task"
    div.innerHTML = `<strong>${t.task}</strong> - ${t.date}`
    taskListDiv.appendChild(div)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const data = {
    task: document.getElementById("task").value,
    date: document.getElementById("date").value
  }
  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  form.reset()
  fetchTasks()
})

fetchTasks()