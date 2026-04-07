let alarms = []

function updateClock() {
    const now = new Date()
    const time = now.toLocaleTimeString()
    document.getElementById("clock").innerText = time

    checkAlarms(time)
}

function checkAlarms(currentTime) {
    alarms.forEach(a => {
        if (a === currentTime) {
            document.getElementById("alarmSound").play()
            alert("Alarm Ringing: " + currentTime)
        }
    })
}

async function loadAlarms() {
    const res = await fetch("/alarms")
    alarms = await res.json()
    displayAlarms()
}

function displayAlarms() {
    const list = document.getElementById("alarmList")
    list.innerHTML = ""

    alarms.forEach(a => {
        const li = document.createElement("li")
        li.innerText = a
        list.appendChild(li)
    })
}

async function setAlarm() {
    const time = document.getElementById("alarmTime").value
    if (!time) return

    const formatted = new Date("1970-01-01T" + time).toLocaleTimeString()

    await fetch("/alarms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatted)
    })

    loadAlarms()
}

setInterval(updateClock, 1000)

loadAlarms()