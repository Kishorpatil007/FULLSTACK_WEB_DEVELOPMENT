// Project 132: Banking Core Sim
const API = 'http://localhost:3000/api';
let records = [];

function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (el) el.classList.add('active');
    if (id === 'manage' || id === 'dashboard') loadAll();
    if (id === 'reports') loadReports();
}

async function loadAll() {
    try {
        const res = await fetch(`${API}/records`);
        records = await res.json();
    } catch(e) {
        records = JSON.parse(localStorage.getItem('records_132') || '[]');
    }
    renderAll();
    updateStats();
}

function renderAll() {
    const list = document.getElementById('allList');
    const recent = document.getElementById('recentList');
    if (!records.length) {
        list.innerHTML = '<div class="empty"><div class="empty-icon">📭</div><p>No records yet. Add your first one!</p></div>';
        recent.innerHTML = '<div class="empty"><div class="empty-icon">📭</div><p>No recent activity</p></div>';
        return;
    }
    const html = records.slice().reverse().map(r => `
        <div class="card">
            <div class="card-top">
                <div>
                    <div class="card-title">${r.title || r.name || 'Untitled'}</div>
                    <div class="card-sub">${r.description || r.desc || ''}</div>
                </div>
                <span class="badge ${r.status==='Active'?'badge-success':r.status==='Pending'?'badge-warning':r.status==='Completed'?'badge-primary':'badge-danger'}">${r.status}</span>
            </div>
            <div class="card-bottom">
                <span style="font-size:12px;color:var(--text2)">${r.extra || ''} &nbsp; ${new Date(r.createdAt||Date.now()).toLocaleDateString()}</span>
                <button class="btn btn-danger" onclick="deleteRecord('${r.id}')">Delete</button>
            </div>
        </div>
    `).join('');
    list.innerHTML = html;
    recent.innerHTML = records.slice(-5).reverse().map(r => `
        <div class="card">
            <div class="card-top">
                <div><div class="card-title">${r.title||r.name||'Untitled'}</div><div class="card-sub">${r.description||''}</div></div>
                <span class="badge ${r.status==='Active'?'badge-success':r.status==='Pending'?'badge-warning':'badge-primary'}">${r.status}</span>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('totalCount').textContent = records.length;
    document.getElementById('activeCount').textContent = records.filter(r=>r.status==='Active').length;
    document.getElementById('pendingCount').textContent = records.filter(r=>r.status==='Pending').length;
    document.getElementById('completedCount').textContent = records.filter(r=>r.status==='Completed').length;
}

async function addRecord() {
    const title = document.getElementById('fieldTitle').value.trim();
    const description = document.getElementById('fieldDesc').value.trim();
    const status = document.getElementById('fieldStatus').value;
    const extra = document.getElementById('fieldExtra').value.trim();
    if (!title) { alert('Title is required'); return; }
    const data = { title, description, status, extra, createdAt: new Date() };
    try {
        const res = await fetch(`${API}/records`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
        if (res.ok) {
            document.getElementById('fieldTitle').value='';
            document.getElementById('fieldDesc').value='';
            document.getElementById('fieldExtra').value='';
            showPage('manage', document.querySelectorAll('.nav-item')[1]);
        }
    } catch(e) {
        data.id = 'local_' + Date.now();
        records.push(data);
        localStorage.setItem('records_132', JSON.stringify(records));
        document.getElementById('fieldTitle').value='';
        showPage('manage', document.querySelectorAll('.nav-item')[1]);
    }
}

async function deleteRecord(id) {
    if (!confirm('Delete this record?')) return;
    try {
        await fetch(`${API}/records/${id}`, { method:'DELETE' });
    } catch(e) {
        records = records.filter(r=>r.id!==id);
        localStorage.setItem('records_132', JSON.stringify(records));
    }
    loadAll();
}

function loadReports() {
    loadAll().then(() => {
        const total = records.length;
        document.getElementById('rTotal').textContent = total;
        document.getElementById('rActive').textContent = records.filter(r=>r.status==='Active').length;
        document.getElementById('rPending').textContent = records.filter(r=>r.status==='Pending').length;
        document.getElementById('rCompleted').textContent = records.filter(r=>r.status==='Completed').length;
        const statuses = {};
        records.forEach(r => { statuses[r.status] = (statuses[r.status]||0)+1; });
        document.getElementById('breakdown').innerHTML = Object.entries(statuses).map(([s,c]) =>
            `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
                <span>${s}</span>
                <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:${Math.round((c/total)*150)}px;height:8px;background:var(--primary);border-radius:4px"></div>
                    <span style="color:var(--text2)">${c}</span>
                </div>
            </div>`
        ).join('') || '<p style="color:var(--text2)">No data yet</p>';
    });
}

loadAll();
