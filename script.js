/* ==========================================================
   GIFT WEBSITE — SEMUA ISI YANG BISA KAMU EDIT ADA DI SINI
   ========================================================== */

const DATA = {
  // HALAMAN PEMBUKA
  openingTitle: "For Someone Special",
  openingText:
    "Aku membuat sesuatu kecil untuk seseorang yang sangat berarti. " +
    "Semoga kamu suka dengan hadiah kecil ini ♥",

  // SURAT
  letterTitle: "Haii Pip Cantikkkk,",
  letterText:
    "Terima kasih karena sudah menjadi bagian dari hari-hariku.\n\n" +
    "Mungkin kata-kata ini sederhana, tapi semuanya dibuat dengan tulus. " +
    "Aku ingin menyimpan sedikit cerita, perasaan, dan kenangan aku, kamu dan kita " +
    "dalam sebuah hadiah kecil ini.\n\n" +
    "Semoga setiap kali kamu melihatnya, kamu bisa tersenyum sedikit.",

  letterSignature: "With love, Ryvl",

  // POHON
  treeTitle: "A little tree for you",
  treeText:
    "Seperti pohon yang tumbuh sedikit demi sedikit, " +
    "semoga hal-hal baik dalam hidupmu juga terus tumbuh dan berkembang.",

  // HALAMAN I LOVE YOU / COUNTDOWN
  loveTitle: "I Love You",
  loveText: "And I will always have a special place for you.",

  // MEMORIES
  memoryTitle: "Little Things About You",
  memoryText:
    "Beberapa hal kecil yang ingin aku abadikan di halaman ini.",

  // PESAN TERAKHIR
  finalText:
    "Terima kasih sudah menjadi kamu, Terima kasih sudah keren sampai saat ini.\n" +
    "Jangan lupa untuk selalu tersenyum dan menjaga dirimu.\n\n" +
    "Semoga hari-harimu selalu dipenuhi hal-hal baik ♥",

  finalSignature: "Orang yg selalu ada untukmu, Ryvl",

  /*
    UBAH BAGIAN INI UNTUK KARTU FOTO.
    image: "assets/foto1.jpg"
    Kalau belum punya foto, kosongkan image: "" dan kartu
    akan menampilkan simbol ♥.
  */
  cards: [
    {
      image: "assets/foto1.jpg",
      title: "A little pip♥"
    },
    {
      image: "assets/foto2.jpg",
      title: "My favorite kind of beautiful♥"
    },
    {
      image: "assets/foto3.jpg",
      title: "A Sweet Memory"
    },
    {
      image: "assets/foto4.jpg",
      title: "Your Smile♥"
    }
  ],

  // WAKTU BERSAMA: isi tanggal awal, bukan tanggal tujuan.
  // Contoh: "2024-02-23T00:00:00+07:00". Kosongkan jika belum ditentukan.
  togetherSince: "2023-09-15",
  togetherLabel: "Our time together...",
  treeGrowDuration: 2200,
  heartsDuration: 3400

};


/* ==========================================================
   JANGAN PERLU DIUBAH DARI SINI KALAU BELUM PERLU
   ========================================================== */

let currentScene = 0;
const scenes = [...document.querySelectorAll(".scene")];

function applyData() {
  document.getElementById("openingTitle").textContent = DATA.openingTitle;
  document.getElementById("openingText").textContent = DATA.openingText;

  document.getElementById("letterTitle").textContent = DATA.letterTitle;
  document.getElementById("letterText").textContent = DATA.letterText;
  document.getElementById("letterSignature").textContent = DATA.letterSignature;

  document.getElementById("treeTitle").textContent = DATA.treeTitle;
  document.getElementById("treeText").textContent = DATA.treeText;

  document.getElementById("loveTitle").textContent = DATA.loveTitle;
  document.getElementById("loveText").textContent = DATA.loveText;

  document.getElementById("memoryTitle").textContent = DATA.memoryTitle;
  document.getElementById("memoryText").textContent = DATA.memoryText;

  document.getElementById("finalText").textContent = DATA.finalText;
  document.getElementById("finalSignature").textContent = DATA.finalSignature;

  createCards();
}

function createCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  DATA.cards.forEach((card, index) => {
    const article = document.createElement("article");
    article.className = "memory-card";
    article.style.animationDelay = `${index * 0.13}s`;

    const photo = document.createElement("div");
    photo.className = "photo";

    if (card.image && card.image.trim() !== "") {
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.title || "Memory";
      img.onerror = () => {
        img.remove();
        photo.textContent = "♥";
      };
      photo.appendChild(img);
    } else {
      photo.textContent = "♥";
    }

    const caption = document.createElement("div");
    caption.className = "card-caption";
    caption.textContent = card.title;

    article.appendChild(photo);
    article.appendChild(caption);
    container.appendChild(article);
  });
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    showScene(currentScene);
  }
}

function showScene(index) {
  scenes.forEach((scene, i) => {
    scene.classList.toggle("active", i === index);
  });

  stopTree();
  clearInterval(togetherTimer);

  if (index === 2) {
    growTree();
  }

  if (index === 3) {
    startTogetherTimer();
  }

  if (index === 4) {
    const last = document.getElementById("sceneMemories");
    last.scrollTop = 0;
  }
}

function restart() {
  currentScene = 0;
  showScene(0);
}

/* ---------- POHON HATI ---------- */
const canvas=document.getElementById('heartTree'),ctx=canvas.getContext('2d');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let started=0,frame=null;
let seed=12345;
function random(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
const palette=['#ec003c','#ff1059','#f44f94','#f57fa4','#c91e9c','#ee62ce','#ffaf31','#ffd425','#ffdb71','#f58b61'];
// Partikel dibagikan di dalam kurva hati, bukan disebarkan di sekitar cabang.
function boundary(t){return{x:16*Math.sin(t)**3,y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))};}
const leaves=[];
for(let i=0;i<1600;i++){
  const angle=random()*Math.PI*2,r=Math.sqrt(random()),p=boundary(angle);
  leaves.push({x:p.x*14*r,y:p.y*16*r,size:4+random()*8,rotation:(random()-.5)*1.8,color:palette[Math.floor(random()*palette.length)],delay:random()*.86});
}
leaves.sort((a,b)=>a.delay-b.delay);
function heart(x,y,size,rotation,color,opacity=1){
 ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.scale(size,size);ctx.globalAlpha=opacity;ctx.fillStyle=color;
 ctx.beginPath();ctx.moveTo(0,.55);ctx.bezierCurveTo(-1,-.1,-.85,-.85,-.35,-.85);ctx.bezierCurveTo(-.1,-.85,0,-.65,0,-.5);ctx.bezierCurveTo(.2,-1,.8,-.95,.9,-.45);ctx.bezierCurveTo(1,.05,.45,.35,0,.8);ctx.fill();ctx.restore();
}
function resize(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);}
new ResizeObserver(resize).observe(canvas);resize();
const ease=t=>1-(1-Math.min(Math.max(t,0),1))**3;
function branch(points,width){ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(...points[0]);for(let i=1;i<points.length;i++)ctx.lineTo(...points[i]);ctx.stroke();}
function drawTree(x,progress){ctx.save();ctx.translate(x,0);ctx.beginPath();ctx.rect(-260,590-500*progress,520,500*progress);ctx.clip();ctx.fillStyle='#8a4b10';ctx.beginPath();ctx.moveTo(-24,588);ctx.lineTo(-8,440);ctx.lineTo(-2,324);ctx.lineTo(8,210);ctx.lineTo(12,325);ctx.lineTo(12,450);ctx.lineTo(24,588);ctx.closePath();ctx.fill();ctx.strokeStyle='#865020';
branch([[0,472],[-21,403],[-72,342],[-122,305]],8);branch([[-61,355],[-64,309],[-84,274]],4);branch([[-78,337],[-132,329],[-166,307]],3);branch([[3,418],[48,348],[92,316],[140,297]],7);branch([[52,345],[59,288],[87,251]],4);branch([[5,341],[-22,279],[-74,244],[-120,229]],5);branch([[-44,266],[-59,224],[-72,207]],2.5);branch([[5,314],[39,253],[73,222],[110,205]],4);branch([[8,281],[0,212],[-17,172]],3);branch([[38,255],[40,214],[57,187]],2);ctx.restore();}
function draw(now){
  ctx.setTransform(canvas.width/1000,0,0,canvas.height/650,0,0);
  ctx.clearRect(0,0,1000,650);
  const elapsed=now-started;
  const grow=reduceMotion?1:ease(elapsed/DATA.treeGrowDuration);
  const bloom=reduceMotion?1:Math.max(0,(elapsed-DATA.treeGrowDuration)/DATA.heartsDuration);
  const x=500;
  ctx.strokeStyle='#594a39';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(50,588);ctx.lineTo(50+900*grow,588);ctx.stroke();drawTree(x,grow);
  for(const leaf of leaves){const t=reduceMotion?1:ease((bloom-leaf.delay)/.14);if(t>0)heart(x+leaf.x,255+leaf.y+25*(1-t),leaf.size*t,leaf.rotation,leaf.color,t);}
  if(bloom>=1&&!reduceMotion){for(let i=0;i<9;i++){const t=((elapsed/11000+i*.117)%1);heart(x-210+t*180+Math.sin(t*8+i)*25,180+t*440,7+i%3,Math.sin(t*3),palette[i],Math.sin(t*Math.PI)*.42);}}
  if(currentScene===2)frame=requestAnimationFrame(draw);
}
function growTree(){stopTree();resize();started=performance.now();frame=requestAnimationFrame(draw);}
function stopTree(){if(frame!==null){cancelAnimationFrame(frame);frame=null;}}

/* ---------- WAKTU BERSAMA (MENGHITUNG MAJU) ---------- */
let togetherTimer=null;
function elapsedParts(now,start){
  const seconds=Math.floor(Math.max(0,now-start)/1000);
  return [Math.floor(seconds/86400),Math.floor(seconds%86400/3600),Math.floor(seconds%3600/60),seconds%60];
}
function startTogetherTimer(){
  clearInterval(togetherTimer);
  const ids=['days','hours','minutes','seconds'];
  const start=Date.parse(DATA.togetherSince);
  const label=document.getElementById('togetherLabel');
  if(!Number.isFinite(start)){
    label.textContent='Isi tanggal awal kalian di script.js ♥';
    ids.forEach(id=>document.getElementById(id).textContent='—');return;
  }
  function update(){
    label.textContent=start>Date.now()?'Tanggal awal belum tiba ♥':DATA.togetherLabel;
    elapsedParts(Date.now(),start).forEach((value,i)=>{
      document.getElementById(ids[i]).textContent=i===0?String(value):String(value).padStart(2,'0');
    });
  }
  update();togetherTimer=setInterval(update,1000);
}

/* ---------- MUSIC ---------- */

const music = document.getElementById("bgMusic");
let musicPlaying = false;

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    document.getElementById("musicIcon").textContent = "♫";
  } else {
    music.play().then(() => {
      musicPlaying = true;
      document.getElementById("musicIcon").textContent = "❚❚";
    }).catch(() => {
      alert("Tambahkan file musik bernama music.mp3 ke folder assets.");
    });
  }
}


/* ---------- START ---------- */

applyData();
showScene(0);
