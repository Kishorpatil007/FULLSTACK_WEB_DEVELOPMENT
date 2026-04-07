async function loadContent() {
    const res = await fetch("/content")
    const data = await res.json()

    if (document.getElementById("homeTitle")) document.getElementById("homeTitle").innerText = data.homeTitle
    if (document.getElementById("aboutText")) document.getElementById("aboutText").innerText = data.aboutText
    if (document.getElementById("servicesList")) {
        const list = document.getElementById("servicesList")
        list.innerHTML = ""
        data.services.forEach(s => {
            const li = document.createElement("li")
            li.innerText = s
            list.appendChild(li)
        })
    }

    if (document.getElementById("homeTitle") && document.getElementById("aboutText") && document.getElementById("services")) {
        document.getElementById("homeTitle").value = data.homeTitle
        document.getElementById("aboutText").value = data.aboutText
        document.getElementById("services").value = data.services.join(", ")
    }
}

async function saveContent() {
    const homeTitle = document.getElementById("homeTitle").value
    const aboutText = document.getElementById("aboutText").value
    const services = document.getElementById("services").value.split(",").map(s => s.trim())

    await fetch("/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeTitle, aboutText, services })
    })

    document.getElementById("status").innerText = "Content saved!"
    setTimeout(() => { document.getElementById("status").innerText = "" }, 3000)
}

loadContent()