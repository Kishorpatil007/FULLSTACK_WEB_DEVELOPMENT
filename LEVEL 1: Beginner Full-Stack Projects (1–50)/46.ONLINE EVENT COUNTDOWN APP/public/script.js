let targetDate = null

async function loadEvent() {
    const res = await fetch("/event")
    const data = await res.json()

    document.getElementById("title").innerText = data.name
    targetDate = new Date(data.date)
}

async function saveEvent() {
    const name = document.getElementById("eventName").value
    const date = document.getElementById("eventDate").value

    if (!name || !date) return

    await fetch("/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date })
    })

    loadEvent()
}

function updateCountdown() {
    if (!targetDate) return

    const now = new Date()
    const diff = targetDate - now

    if (diff <= 0) return

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    document.getElementById("days").innerText = days
    document.getElementById("hours").innerText = hours
    document.getElementById("minutes").innerText = minutes
    document.getElementById("seconds").innerText = seconds
}

setInterval(updateCountdown, 1000)

loadEvent()