// ====== Phrases do HERO (3s cada) ======
const phrases = [
  "Alguns encontros mudam nossas vidas para sempre",
  "Cada momento ao seu lado é uma memória eterna",
  "Deslize para reviver nossa jornada"
];
const phraseEl = document.getElementById('phrase');
const scrollTip = document.getElementById('scroll-tip');

let idx = 0;
function showPhrase(i){
  phraseEl.classList.remove('show');
  setTimeout(()=>{ phraseEl.textContent = phrases[i]; phraseEl.classList.add('show'); }, 120);
}
function sequence(){
  showPhrase(idx);
  const timer = setInterval(()=>{
    idx = (idx + 1);
    if(idx < phrases.length){
      showPhrase(idx);
    } else {
      clearInterval(timer);
      setTimeout(()=>{ scrollTip.style.display = 'grid'; }, 400);
    }
  }, 3000);
}
window.addEventListener('load', ()=>{
  phraseEl.classList.add('show');
  setTimeout(sequence, 3000);
});

// ====== Canvas: fundo estrelado ======
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let W, H, stars = [];

function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

function createStars(){
  const count = Math.min(240, Math.floor((W*H)/12000));
  stars = Array.from({length: count}, ()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*1.2 + 0.3,
    v: Math.random()*0.3 + 0.05,
    a: Math.random()*1
  }));
}
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const s of stars){
    s.y += s.v; if(s.y > H) { s.y = 0; s.x = Math.random()*W; }
    s.a += 0.02; const tw = (Math.sin(s.a) + 1)/2;
    ctx.globalAlpha = 0.5 + tw*0.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(255,255,255,.6)';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
createStars(); draw();

// ====== Contador Seção "Nossa história" ======
function startDateLocal(){ return new Date(2025, 0, 11, 0, 0, 0, 0); } // 11/01/2025 local

const dEl = document.getElementById('days');
const hEl = document.getElementById('hours');
const mEl = document.getElementById('minutes');
const sEl = document.getElementById('seconds');

function updateCounterBlocks(){
  const start = startDateLocal();
  const now = new Date();
  let diff = Math.max(0, now - start);

  const sec = Math.floor(diff/1000);
  const days = Math.floor(sec / 86400);
  const hrs = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  if(dEl){ dEl.textContent = days.toString(); }
  if(hEl){ hEl.textContent = hrs.toString().padStart(2,'0'); }
  if(mEl){ mEl.textContent = mins.toString().padStart(2,'0'); }
  if(sEl){ sEl.textContent = secs.toString().padStart(2,'0'); }
}
setInterval(updateCounterBlocks, 1000);
updateCounterBlocks();

// ====== Música (Seção 2) ======
const playBtn = document.getElementById('playBtn');
const bgMusic = document.getElementById('bgMusic');
if (playBtn && bgMusic) {
  playBtn.addEventListener('click', async () => {
    try { await bgMusic.play(); } catch(e){ /* autoplay bloqueado */ }
  });
}

// ====== Contador detalhado (Seção final) ======
const detailedEl = document.getElementById("contador-detalhado");
function updateDetailed(){
  const inicio = startDateLocal();
  const agora = new Date();
  const diff = Math.max(0, agora - inicio);

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  if(detailedEl){
    detailedEl.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }
}
setInterval(updateDetailed, 1000);
updateDetailed();

// ====== Botão "Te Amo" -> Corações ======
const loveBtn = document.getElementById("loveBtn");
if(loveBtn){
  loveBtn.addEventListener("click", () => {
    for (let i = 0; i < 20; i++) criarCoracao();
  });
}
function criarCoracao() {
  const coracao = document.createElement("div");
  coracao.textContent = "❤️";
  coracao.style.position = "fixed";
  coracao.style.fontSize = `${Math.random() * 15 + 15}px`;
  coracao.style.left = Math.random() * 100 + "vw";
  coracao.style.top = "100vh";
  coracao.style.opacity = 1;
  coracao.style.transition = "transform 3s linear, opacity 3s linear";
  document.body.appendChild(coracao);

  setTimeout(() => {
    coracao.style.transform = `translateY(-110vh)`;
    coracao.style.opacity = 0;
  }, 50);

  setTimeout(() => coracao.remove(), 3000);
}

// ====== Acessibilidade: setas para pular intro ======
document.addEventListener('keydown', (e)=>{
  if(e.key === 'PageDown' || e.key === 'ArrowDown'){
    document.getElementById('historia')?.scrollIntoView({behavior:'smooth'});
  }
});
// Navegação por bolinhas
const sections = document.querySelectorAll(".screen");
const dots = document.querySelectorAll(".dot");

function activateDot() {
  let index = sections.length;
  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}
activateDot();
window.addEventListener("scroll", activateDot);

// Clique nos dots
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.target);
    target.scrollIntoView({ behavior: "smooth" });
  });
});