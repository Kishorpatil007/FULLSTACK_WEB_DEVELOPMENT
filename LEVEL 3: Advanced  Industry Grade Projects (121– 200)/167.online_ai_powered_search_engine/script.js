const API = 'http://localhost:3000/api';
const ENTITY = 'index';
const FIELDS = ['id', 'content', 'title', 'url', 'score'];
let allData = [];

// Tab switching
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    link.classList.add('active');
    const tab = document.getElementById('tab-' + link.dataset.tab);
    if(tab) tab.classList.add('active');
  });
});
document.querySelector('.sidebar-link')?.classList.add('active');

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if(e.target === m) m.classList.remove('open'); }));

function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.background = type === 'error' ? '#ef4444' : 'var(--primary)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

async function loadData() {
  try {
    const res = await fetch(`${API}/${ENTITY}`);
    allData = await res.json();
    renderTable(allData);
  } catch(e) {
    // Demo: load mock data
    allData = generateMockData();
    renderTable(allData);
  }
}

function generateMockData() {
  const samples = [];
  const names = ['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta'];
  for(let i=0;i<8;i++) {
    const obj = {id: 'id_'+i};
    FIELDS.forEach((f,idx) => {
      if(f === 'id') obj[f] = 'id_'+i;
      else if(f.includes('name') || f.includes('title')) obj[f] = names[i%names.length]+' '+f;
      else if(f.includes('email')) obj[f] = names[i].toLowerCase()+'@example.com';
      else if(f.includes('status')) obj[f] = ['Active','Pending','Completed','Inactive'][i%4];
      else if(f.includes('date') || f.includes('At') || f.includes('time')) obj[f] = new Date(Date.now()-i*864e5).toLocaleDateString();
      else obj[f] = 'Sample '+f+' '+(i+1);
    });
    samples.push(obj);
  }
  return samples;
}

function renderTable(data) {
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyState');
  if(!data || data.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = data.map(item => `
    <tr>
      ${FIELDS.slice(0,5).map(f => `<td>${item[f] !== undefined ? item[f] : '-'}</td>`).join('')}
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteRecord('${item.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function filterTable(query) {
  const filtered = allData.filter(item =>
    FIELDS.some(f => String(item[f]||'').toLowerCase().includes(query.toLowerCase()))
  );
  renderTable(filtered);
}

async function addRecord() {
  const obj = {};
  FIELDS.forEach(f => {
    const el = document.getElementById('field_'+f);
    if(el) obj[f] = el.value;
  });
  
  const hasValues = Object.values(obj).some(v => v && v.trim());
  if(!hasValues) { showToast('Please fill at least one field', 'error'); return; }

  try {
    const res = await fetch(`${API}/${ENTITY}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(obj)
    });
    if(res.ok) {
      closeModal('addModal');
      loadData();
      showToast('Record added successfully!');
      FIELDS.forEach(f => { const el = document.getElementById('field_'+f); if(el) el.value=''; });
    }
  } catch(e) {
    // Simulate local add
    obj.id = 'local_'+Date.now();
    allData.unshift(obj);
    renderTable(allData);
    closeModal('addModal');
    showToast('Record added (demo mode)!');
    FIELDS.forEach(f => { const el = document.getElementById('field_'+f); if(el) el.value=''; });
  }
}

async function deleteRecord(id) {
  if(!confirm('Delete this record?')) return;
  try {
    await fetch(`${API}/${ENTITY}/${id}`, {method:'DELETE'});
    loadData();
    showToast('Deleted successfully!');
  } catch(e) {
    allData = allData.filter(i => i.id !== id);
    renderTable(allData);
    showToast('Deleted (demo mode)!');
  }
}

loadData();
