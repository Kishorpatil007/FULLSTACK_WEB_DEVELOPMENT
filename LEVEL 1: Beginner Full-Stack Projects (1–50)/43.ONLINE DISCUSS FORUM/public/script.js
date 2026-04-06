const postsContainer = document.getElementById('posts');
const postBtn = document.getElementById('postBtn');
const usernameInput = document.getElementById('username');
const contentInput = document.getElementById('content');

function fetchPosts() {
    fetch('/api/posts')
        .then(res => res.json())
        .then(data => {
            postsContainer.innerHTML = '';
            data.forEach(post => {
                const div = document.createElement('div');
                div.className = 'post';
                div.innerHTML = `<h3>${post.username}<span>${new Date(post.timestamp).toLocaleString()}</span></h3><p>${post.content}</p>`;
                postsContainer.appendChild(div);
            });
        });
}

postBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const content = contentInput.value.trim();
    if(username && content){
        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, content })
        })
        .then(res => res.json())
        .then(data => {
            usernameInput.value = '';
            contentInput.value = '';
            fetchPosts();
        });
    }
});

fetchPosts();
setInterval(fetchPosts, 5000);