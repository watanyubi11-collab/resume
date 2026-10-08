const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join('');
document.title="CV — "+DATA.name;
const fallback="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 130'><rect width='110' height='130' fill='#111111'/><text x='55' y='82' font-size='56' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>${esc((DATA.nick||'D')[0]).toUpperCase()}</text></svg>`);
const sec=(t,html)=>`<h2>${t}</h2>${html}`;
let h=`<div class="head"><img src="${esc(DATA.photo)}" onerror="this.onerror=null;this.src='${fallback}'" alt="">
<div><h1>${esc(DATA.name)}</h1><div class="role mono">${esc(DATA.role)}</div>
<div class="ct">${DATA.contacts.map(c=>`${c[0]} ${esc(c[2])}`).join(' &nbsp;·&nbsp; ')}</div></div></div>`;
h+=sec('ข้อมูลส่วนตัว',`<table>${CV.personal.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>`);
h+=sec('วัตถุประสงค์ / แนะนำตัว',CV.statement.map(p=>`<p>${esc(p)}</p>`).join(''));
h+=sec('ประวัติการศึกษา',CV.education.map(e=>`<div class="entry"><h3>${esc(e.degree)}</h3><div class="sub"><span>${esc(e.school)}</span><span class="mono">${esc(e.period)}${e.gpa?' · GPA '+esc(e.gpa):''}</span></div><p>${esc(e.detail)}</p></div>`).join(''));
h+=sec('ประสบการณ์ทำงาน',CV.experience.map(x=>`<div class="entry"><h3>${esc(x.position)}</h3><div class="sub"><span>${esc(x.company)}</span><span class="mono">${esc(x.period)}</span></div><p>${esc(x.summary)}</p><h4>หน้าที่ความรับผิดชอบ</h4><ul>${li(x.duties)}</ul>${x.achievements?.length?`<h4>ผลงานที่โดดเด่น</h4><ul>${li(x.achievements)}</ul>`:''}</div>`).join(''));
h+=sec('โครงการที่ผ่านมา',CV.projects.map(p=>`<div class="entry"><h3>${esc(p.title)}</h3><div class="sub"><span class="mono">${esc(p.period)}</span></div><p>${esc(p.detail)}</p></div>`).join(''));
h+=sec('ทักษะ',`<p>${esc(CV.skillsText)}</p>`);
if(CV.training.length)h+=sec('การฝึกอบรม เกียรติบัตร และใบรับรอง',`<ul class="list">${li(CV.training)}</ul>`);
h+=sec('ภาษา',`<table>${CV.languages.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>`);
if(CV.references.length)h+=sec('บุคคลอ้างอิง',CV.references.map(r=>`<p style="margin-bottom:6px"><b>${esc(r.name)}</b> — ${esc(r.position)}<br><span class="mono" style="font-size:.85rem;color:var(--muted)">${esc(r.contact)}</span></p>`).join(''));
document.getElementById('doc').innerHTML=h;
