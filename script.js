/* ส่วนการทำงานของเว็บ — ปกติไม่ต้องแก้ (ข้อมูลอยู่ใน data.js) */
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const icons=["🖼️","📊","🛠️","🏅"];
function img(src,cls,i,alt){ // รูป + fallback placeholder
  return `<img class="${cls}" src="${esc(src||'')}" alt="${esc(alt)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;ph&quot;>${icons[i%4]}</div>'">`;
}
document.title=DATA.name+" — "+DATA.role;
$('logo').innerHTML=`&lt;<span style="color:var(--accent)">${esc(DATA.nick)}</span>/&gt;`;
$('avatar').src=DATA.photo;
$('avatar').onerror=function(){this.onerror=null;this.src="data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#6366f1'/><stop offset='1' stop-color='#06b6d4'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><text x='100' y='128' font-size='90' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>${esc(DATA.nick[0]||'D').toUpperCase()}</text></svg>`)};
$('status').textContent=DATA.status;
$('title').innerHTML=`สวัสดี ผม <span class="grad">${esc(DATA.name)}</span><br>${esc(DATA.role)}`;
$('intro').textContent=DATA.intro;
$('about-text').textContent=DATA.about;
$('stats').innerHTML=DATA.stats.map(s=>`<div class="stat card"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join('');
$('bars').innerHTML=DATA.skills.map(s=>`<div class="skill"><div><span>${esc(s[0])}</span><span class="mono">${s[1]}%</span></div><div class="bar-bg"><div class="bar-fill" data-w="${s[1]}"></div></div></div>`).join('');
$('chips').innerHTML=`<h3 style="margin-top:0">เครื่องมือ & ระบบที่ใช้</h3><div class="chips">${DATA.tools.map(t=>`<span class="chip mono">${esc(t)}</span>`).join('')}</div>`+((DATA.learning||[]).length?`<h3>🌱 กำลังเรียนรู้</h3><div class="chips">${DATA.learning.map(t=>`<span class="chip mono" style="border-style:dashed;background:transparent">${esc(t)}</span>`).join('')}</div>`:'');
$('timeline').innerHTML=DATA.timeline.map(t=>`<div class="item"><h3>${esc(t.title)}</h3><div class="meta mono">${esc(t.meta)}</div><ul>${t.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`).join('');
$('proj').innerHTML=DATA.projects.map((p,i)=>`<div class="card pcard">${img(p.image,'thumb zoom',i,p.title)}<div class="pbody"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="chips">${(p.tags||[]).map(t=>`<span class="chip mono">${esc(t)}</span>`).join('')}</div>${(p.demo||p.code)?`<div class="links2">${p.demo?`<a href="${esc(p.demo)}" target="_blank" rel="noopener">▶ Demo</a>`:''}${p.code?`<a href="${esc(p.code)}" target="_blank" rel="noopener">⌥ Code</a>`:''}</div>`:''}</div></div>`).join('');
if(DATA.certs.length){
  $('certGrid').innerHTML=DATA.certs.map((c,i)=>`<div class="card pcard cert">${img(c.image,'thumb zoom',3,c.title)}<div class="pbody"><h3>${esc(c.title)}</h3><p style="margin:0">${esc(c.issuer||'')}</p></div></div>`).join('');
}else{$('certs').remove();$('navCert').remove()}
$('contactGrid').innerHTML=DATA.contacts.map(c=>`<a class="card" href="${esc(c[3])}" target="_blank" rel="noopener">${c[0]}<br><b>${esc(c[1])}</b><br><span class="mono" style="font-size:.85rem">${esc(c[2])}</span></a>`).join('');
$('foot').textContent=`© ${new Date().getFullYear()} ${DATA.name}`;

// lightbox (คลิกรูปเพื่อขยาย)
document.addEventListener('click',e=>{
  const z=e.target.closest('img.zoom');
  if(z){$('lb').querySelector('img').src=z.src;$('lb').classList.add('open')}
  else if(e.target.closest('#lb'))$('lb').classList.remove('open');
});
document.addEventListener('keydown',e=>e.key==='Escape'&&$('lb').classList.remove('open'));

// theme
const root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
$('theme').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}};

// typing effect
(function(){let w=0,c=0,del=false;const el=$('typed');
  (function tick(){const word=DATA.typing[w%DATA.typing.length];
    el.textContent="> "+word.slice(0,c);
    if(!del&&c===word.length){del=true;return setTimeout(tick,1400)}
    if(del&&c===0){del=false;w++}
    c+=del?-1:1;setTimeout(tick,del?40:90)})()})();

// reveal + skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('show');e.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(e.target)}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
