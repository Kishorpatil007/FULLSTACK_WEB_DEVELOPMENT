let selectedOption = null

async function loadPoll() {
    const res = await fetch("/poll")
    const data = await res.json()

    document.getElementById("question").innerText = data.question

    const optionsDiv = document.getElementById("options")
    optionsDiv.innerHTML = ""

    data.options.forEach(opt => {
        const div = document.createElement("div")
        div.className = "option"

        div.innerHTML = `
            <input type="radio" name="option" value="${opt.id}">
            ${opt.text}
        `

        optionsDiv.appendChild(div)
    })

    showResults(data)
}

function showResults(data) {
    const resultsDiv = document.getElementById("results")
    resultsDiv.innerHTML = ""

    const totalVotes = data.options.reduce((sum, o) => sum + o.votes, 0)

    data.options.forEach(opt => {
        const percent = totalVotes ? (opt.votes / totalVotes) * 100 : 0

        const div = document.createElement("div")
        div.innerHTML = `
            ${opt.text} (${opt.votes})
            <div class="bar" style="width:${percent}%"></div>
        `
        resultsDiv.appendChild(div)
    })
}

async function submitVote() {
    const selected = document.querySelector('input[name="option"]:checked')
    if (!selected) return

    await fetch("/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId: parseInt(selected.value) })
    })

    loadPoll()
}

loadPoll()