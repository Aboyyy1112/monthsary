/* =====================================================
   KONFIGURASI — edit bagian ini saja untuk personalisasi
   ===================================================== */
const CONFIG = {
  nameA: "Abrar",
  nameB: "Stevani",
  startDate: "2026-10-19T22:30:00",   // Tanggal jadian (format: YYYY-MM-DDTHH:MM:SS)
  password: "19102026",                // Jawaban yang benar (tanggal jadian, DDMMYYYY)
  decoys: ["09092026", "18092026", "19012026"],  // Pilihan jawaban salah
  youtubeUrl: "",                      // Tempel link YouTube di sini, mis. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  musicSrc: "",                        // Isi mis. "music.mp3" untuk lagu sendiri; kosong = musik lembut bawaan

  timeline: [
    { date: "9 September 2026", title: "Pertama Bertemu", text: "Hari yang tak terduga di platform discord" },
    { date: "19 Oktober 2026",  title: "Awal Hubungan Kita", text: "Hari kita memilih untuk saling menjaga." },
    { date: "18 September 2026",  title: "Kenangan Pertama", text: "Menonton Obsession,Dan baywan hero ML" },
    { date: "Hari Ini",         title: "Dan Seterusnya…", text: "Masih ada banyak halaman yang belum kita tulis." }
  ],

  // Ganti src dengan foto kalian, mis. src: "foto/1.jpg". Kosongkan untuk placeholder.
  photos: [
    { src: "mole.jpeg", caption: "Lovers In MOLEN" },
    { src: "papelo.jpeg", caption: "Menamatkan game susah :)" },
    { src: "roblox.jpeg", caption: "Moment Roblox" },
    { src: "mirip.jpeg", caption: "Miripp" },
    { src: "10jam.jpeg", caption: "Sleep Call :)" },
    { src: "stardew.jpeg", caption: "Berkebun" }
  ],

  letter: `Untuk kamu, yang selalu kusebut rumah,

Terima kasih sudah hadir dalam hidupku. Dari sekian banyak pertemuan yang mungkin hanya menjadi persinggahan, entah bagaimana semesta mempertemukanku dengan seseorang sepertimu. Seseorang yang perlahan menjadi bagian dari hari-hariku, menjadi alasan di balik senyum-senyum kecilku, dan menjadi nama yang selalu ingin kusebut dalam setiap doa.

Aku tahu, aku bukan laki-laki yang sempurna. Masih banyak hal dalam diriku yang perlu diperbaiki, masih banyak sikapku yang mungkin terkadang membuatmu kecewa, dan mungkin ada saatnya aku belum mampu menjadi seperti yang kamu harapkan. Namun, ada satu hal yang ingin selalu kamu yakini: aku sungguh-sungguh ingin membahagiakanmu.

Aku ingin melihatmu tumbuh, mengejar segala impianmu, merayakan setiap pencapaian kecilmu, bahkan menemanimu melewati kegagalan yang mungkin membuatmu ingin menyerah. Aku tidak ingin menjadi seseorang yang hanya datang untuk menikmati indahnya dirimu, tetapi juga seseorang yang bersedia menemani setiap prosesmu.

Sayangku panuyy, jika suatu hari nanti rambut kita mulai memutih dan wajah kita tak lagi seperti sekarang, aku berharap kita masih menjadi dua orang yang saling menggenggam tangan. Masih saling bercerita tentang hal-hal kecil, masih saling menggoda, dan masih menemukan alasan untuk jatuh cinta kepada orang yang sama.

Aku tidak bisa menjanjikan bahwa perjalanan kita akan selalu mudah. Akan ada perbedaan, kesalahpahaman, dan hari-hari ketika kesabaran kita diuji. Tetapi aku ingin kita selalu punya alasan untuk kembali saling memahami, bukan mencari alasan untuk saling meninggalkan.

Aku tidak hanya ingin mencintaimu hari ini. Aku ingin terus belajar mencintaimu dengan lebih baik pada hari esok, lusa, dan hari-hari yang bahkan belum pernah kita bayangkan.

Dengan segenap sayang,
${"Abrar"}`,

  loveMessages: [
    "Aku sayang kamu lebih dari siapapun.",
    "Kamu adalah Orang yang selama ini aku impikan.",
    "Bersamamu, duniaku terasa jadi tenang",
    "Sebanyak bintang yang menemani malam kita.",
    "Kamu alasan senyumku tiap pagi.",
    "Hatiku sudah yakin memilih kamu.",
    "Tak terhingga, dan masih bertambah setiap hari."
  ],

  finalMessage: "Terima kasih sudah bersamaku, lagi dan lagi. Aku janji akan terus menyayangimu, di bulan ini dan di semua bulan setelahnya. ♡"
};

/* ---------- Helper ---------- */
const $ = id => document.getElementById(id);
const rand = (a, b) => Math.random() * (b - a) + a;

/* ---------- Nama ---------- */
$("nameA").textContent = CONFIG.nameA;
$("nameB").textContent = CONFIG.nameB;

/* ---------- Latar: hati melayang & bintang (jumlah dibatasi agar ringan) ---------- */
(function buildBackground() {
  const bg = $("bg");
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "fh"; h.textContent = "♥";
    h.style.cssText = `left:${rand(0, 100)}%;font-size:${rand(10, 26)}px;animation-duration:${rand(12, 24)}s;animation-delay:${-rand(0, 20)}s`;
    bg.appendChild(h);
  }
  for (let i = 0; i < 35; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.cssText = `left:${rand(0, 100)}%;top:${rand(0, 100)}%;animation-delay:${-rand(0, 3)}s`;
    bg.appendChild(s);
  }
})();

/* ---------- Musik ---------- */
const music = (() => {
  let audio = null, ctx = null, timer = null, playing = false;
  const notes = [261.6, 329.6, 392, 523.3, 392, 329.6, 440, 349.2, 261.6, 392, 329.6, 293.7]; // arpeggio lembut

  function tone(freq) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 2.3);
  }
  return {
    start() {
      playing = true;
      if (CONFIG.musicSrc) {
        audio = audio || Object.assign(new Audio(CONFIG.musicSrc), { loop: true, volume: 0.5 });
        audio.play().catch(() => {});
        return;
      }
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume();
      let i = 0;
      timer = setInterval(() => tone(notes[i++ % notes.length]), 900);
    },
    stop() {
      playing = false;
      if (audio) audio.pause();
      clearInterval(timer);
    },
    toggle() { playing ? this.stop() : this.start(); return playing; }
  };
})();

const musicBtn = $("musicBtn");
musicBtn.addEventListener("click", () => musicBtn.classList.toggle("muted", !music.toggle()));

/* ---------- 0. Gate: password pilihan ganda ---------- */
(function gate() {
  const box = $("gateOpts"), hint = $("gateHint");
  [CONFIG.password, ...CONFIG.decoys].sort(() => Math.random() - 0.5).forEach(v => {
    const b = document.createElement("button");
    b.className = "opt"; b.textContent = v;
    b.addEventListener("click", () => {
      if (v === CONFIG.password) {
        b.classList.add("right");
        hint.textContent = "Benar! ♡ Kamu memang ingat.";
        setTimeout(() => { $("gate").hidden = true; $("openBtn").hidden = false; }, 1000);
      } else {
        b.classList.add("wrong"); b.disabled = true;
        hint.textContent = "Hmm, bukan itu… coba ingat lagi ya 🥺";
      }
    });
    box.appendChild(b);
  });
})();

/* ---------- Hati kecil muncul di setiap sentuhan/klik ---------- */
document.addEventListener("click", e => {
  const h = document.createElement("span");
  h.className = "ck"; h.textContent = "♥";
  h.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${rand(14, 24)}px`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 900);
});

/* ---------- 1. Opening ---------- */
$("openBtn").addEventListener("click", () => {
  $("intro").classList.add("leave");
  $("main").classList.remove("hidden");
  musicBtn.hidden = false;
  music.start();                       // dimulai dari klik pengguna (syarat browser)
  window.scrollTo(0, 0);
  setTimeout(() => { $("intro").style.display = "none"; observeReveals(); }, 1200);
});

/* ---------- 3. Timeline ---------- */
$("timeline").innerHTML = CONFIG.timeline.map(t =>
  `<div class="t-item glass reveal"><time>${t.date}</time><h3>${t.title}</h3><p>${t.text}</p></div>`).join("");

/* ---------- 4. Galeri polaroid ---------- */
// Placeholder SVG (gradien + hati) agar tanpa foto pun terlihat cantik
function placeholder(i) {
  const c = ["#F8C8DC", "#DCD6F7", "#FFE3D3"][i % 3];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c}'/><stop offset='1' stop-color='#fff'/></linearGradient></defs><rect width='400' height='400' fill='url(#g)'/><text x='200' y='235' font-size='110' text-anchor='middle' fill='#D98FA6' opacity='.7'>♡</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
$("gallery").innerHTML = CONFIG.photos.map((p, i) =>
  `<figure class="polaroid reveal" style="--r:${(i % 2 ? 1 : -1) * rand(1, 3.5).toFixed(1)}deg" data-i="${i}">
     <img src="${p.src || placeholder(i)}" alt="${p.caption}" loading="lazy"><p>${p.caption}</p></figure>`).join("");

// Lightbox
const lb = $("lightbox");
$("gallery").addEventListener("click", e => {
  const f = e.target.closest(".polaroid"); if (!f) return;
  $("lbImg").src = f.querySelector("img").src;
  $("lbCap").textContent = f.querySelector("p").textContent;
  lb.hidden = false;
});
lb.addEventListener("click", e => { if (e.target !== $("lbImg")) lb.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

/* ---------- 5. Surat + efek typewriter ---------- */
const env = $("envelope");
let letterDone = false;
function openLetter() {
  if (env.classList.contains("open")) return;
  env.classList.add("open");
  setTimeout(() => {
    $("paper").classList.add("open");
    if (letterDone) return; letterDone = true;
    const el = $("letterText"), text = CONFIG.letter.replace("Rafi", CONFIG.nameA);
    let i = 0; el.classList.add("typing");
    (function type() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(type, 35); else el.classList.remove("typing");
    })();
  }, 700);
}
env.addEventListener("click", openLetter);
env.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openLetter(); });

/* ---------- 6. How much I love you ---------- */
let loveIdx = 0;
$("loveBtn").addEventListener("click", () => {
  const msg = $("loveMsg");
  msg.style.opacity = 0;
  setTimeout(() => { msg.textContent = CONFIG.loveMessages[loveIdx++ % CONFIG.loveMessages.length]; msg.style.opacity = 1; }, 250);
  for (let i = 0; i < 8; i++) {          // hati muncul dari tombol
    const h = document.createElement("span");
    h.className = "lh"; h.textContent = "♥";
    h.style.cssText = `--x:${rand(-130, 130)}px;font-size:${rand(14, 30)}px;animation-delay:${i * 0.06}s`;
    $("loveHearts").appendChild(h);
    setTimeout(() => h.remove(), 2200);
  }
});

/* ---------- 7. Counter real-time ---------- */
const start = new Date(CONFIG.startDate).getTime();
function tick() {
  const d = Math.max(0, Date.now() - start);
  $("cDays").textContent  = Math.floor(d / 864e5);
  $("cHours").textContent = Math.floor(d / 36e5) % 24;
  $("cMins").textContent  = Math.floor(d / 6e4) % 60;
  $("cSecs").textContent  = Math.floor(d / 1e3) % 60;
}
tick(); setInterval(tick, 1000);

/* ---------- 8. Final surprise: confetti ---------- */
$("yesBtn").addEventListener("click", () => {
  const box = $("confetti"), colors = ["#F8C8DC", "#D98FA6", "#DCD6F7", "#FFF5EB", "#fff"];
  for (let i = 0; i < 90; i++) {
    const c = document.createElement("span");
    c.className = "cf";
    const heart = i % 3 === 0;
    c.textContent = heart ? "♥" : "";
    c.style.cssText = `left:${rand(0, 100)}%;--dx:${rand(-80, 80)}px;animation-duration:${rand(2.5, 5)}s;animation-delay:${rand(0, 1)}s;` +
      (heart ? `color:#D98FA6;font-size:${rand(14, 26)}px` : `width:8px;height:12px;background:${colors[i % 5]}`);
    box.appendChild(c);
    setTimeout(() => c.remove(), 6500);
  }
  const m = $("finalMsg"); m.textContent = CONFIG.finalMessage;
  $("noBtn").hidden = true;
  // Video YouTube: ambil ID dari link, lalu tampilkan (musik latar dihentikan agar tidak bentrok)
  const id = (CONFIG.youtubeUrl.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  if (id && $("videoWrap").hidden) {
    music.stop(); musicBtn.classList.add("muted");
    $("videoWrap").innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" title="Video untukmu" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $("videoWrap").hidden = false;
    setTimeout(() => $("videoWrap").scrollIntoView({ behavior: "smooth", block: "center" }), 1200);
  }
  requestAnimationFrame(() => m.classList.add("show"));
});

/* ---------- Animasi muncul saat scroll ---------- */
function observeReveals() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal, .section > .title, .section > .lead").forEach(el => { el.classList.add("reveal"); io.observe(el); });
}

/* ---------- Tombol "pikir dulu" yang menghindar (lucu-lucuan) ---------- */
(function dodge() {
  const no = $("noBtn"); let n = 0;
  const flee = () => {
    n++;
    no.style.transform = `translate(${rand(-70, 70)}px,${rand(-50, 50)}px)`;
    if (n >= 4) no.textContent = "Yaudah, ga bisa kabur 😆";
  };
  no.addEventListener("pointerenter", flee);
  no.addEventListener("click", flee);
})();
