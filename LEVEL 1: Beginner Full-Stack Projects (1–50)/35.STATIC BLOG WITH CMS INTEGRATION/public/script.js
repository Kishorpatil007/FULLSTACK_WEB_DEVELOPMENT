const postsDiv = document.getElementById("posts")

async function fetchPosts() {
  const res = await fetch("/posts")
  const posts = await res.json()

  postsDiv.innerHTML = ""

  posts.forEach(post => {
    const div = document.createElement("div")
    div.className = "post"

    const h2 = document.createElement("h2")
    h2.innerText = post.title

    const p = document.createElement("p")
    p.innerText = post.content

    const date = document.createElement("div")
    date.className = "date"
    date.innerText = post.date

    div.appendChild(h2)
    div.appendChild(p)
    div.appendChild(date)

    postsDiv.appendChild(div)
  })
}

fetchPosts()