/* สร้างหน้า CV จากข้อมูลใน data.js — ไม่ต้องแก้ไฟล์นี้ */
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.title="Resume — "+DATA.name;
const ph=$('photo');ph.src=DATA.photo;
ph.onerror=function(){this.onerror=null;this.src="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='#111111'/><text x='100' y='128' font-size='90' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>${esc((DATA.nick||'D')[0]).toUpperCase()}</text></svg>`)};
$('name').textContent=DATA.name;
$('role').textContent=DATA.role;
$('about').textContent=DATA.about;
$('contacts').innerHTML=DATA.contacts.map(c=>`<li>${c[0]} ${esc(c[2])}</li>`).join('');
$('skills').innerHTML=DATA.skills.map(s=>`<div class="sk"><b>${esc(s[0])}</b><div class="bar"><i style="width:${s[1]}%"></i></div></div>`).join('');
$('tools').innerHTML=DATA.tools.map(t=>`<span class="chip">${esc(t)}</span>`).join('');
if((DATA.learning||[]).length)$('learning').innerHTML=DATA.learning.map(t=>`<span class="chip dash">${esc(t)}</span>`).join('');else $('learnBox').remove();
$('timeline').innerHTML=DATA.timeline.map(t=>`<div class="job"><h4>${esc(t.title)}</h4><div class="meta">${esc(t.meta)}</div><ul>${t.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`).join('');
$('projects').innerHTML=DATA.projects.map(p=>`<div class="proj"><b>${esc(p.title)}</b> <span>— ${esc(p.desc)}</span></div>`).join('');
if(DATA.certs.length)$('certs').innerHTML=DATA.certs.map(c=>`<li>🏅 <b>${esc(c.title)}</b> <span style="color:var(--muted)">· ${esc(c.issuer||'')}</span></li>`).join('');else $('certBox').remove();
