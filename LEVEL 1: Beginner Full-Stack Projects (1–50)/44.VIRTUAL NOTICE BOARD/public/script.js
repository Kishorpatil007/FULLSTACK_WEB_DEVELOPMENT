const noticesContainer = document.getElementById('notices');
const addNoticeBtn = document.getElementById('addNoticeBtn');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

function fetchNotices() {
    fetch('/api/notices')
        .then(res => res.json())
        .then(data => {
            noticesContainer.innerHTML = '';
            data.forEach(notice => {
                const div = document.createElement('div');
                div.className = 'notice';
                div.innerHTML = `<h3>${notice.title}<span>${new Date(notice.timestamp).toLocaleString()}</span></h3><p>${notice.description}</p>`;
                noticesContainer.appendChild(div);
            });
        });
}

addNoticeBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if(title && description){
        fetch('/api/notices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        })
        .then(res => res.json())
        .then(data => {
            titleInput.value = '';
            descriptionInput.value = '';
            fetchNotices();
        });
    }
});

fetchNotices();
setInterval(fetchNotices, 5000);