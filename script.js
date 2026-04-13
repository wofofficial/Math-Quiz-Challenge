let soal = [];
let index = 0;
let score = 0;
let waktu = 15;
let timer;

// 🔥 SOAL PER LEVEL
const easy = [
  {t:"2 + 3 = ?", p:["4","5","6","7"], j:"5"},
  {t:"10 - 4 = ?", p:["5","6","7","8"], j:"6"},
  {t:"3 x 2 = ?", p:["5","6","7","8"], j:"6"},
  {t:"8 ÷ 2 = ?", p:["2","3","4","5"], j:"4"},
  {t:"7 + 1 = ?", p:["7","8","9","10"], j:"8"}
];

const normal = [
  {t:"12 x 3 = ?", p:["24","36","48","30"], j:"36"},
  {t:"25 - 13 = ?", p:["10","11","12","13"], j:"12"},
  {t:"15 ÷ 3 = ?", p:["3","4","5","6"], j:"5"},
  {t:"9² = ?", p:["81","72","64","90"], j:"81"},
  {t:"18 + 27 = ?", p:["45","44","43","42"], j:"45"}
];

const hard = [
  {t:"√144 = ?", p:["10","11","12","13"], j:"12"},
  {t:"20% dari 150 = ?", p:["25","30","35","40"], j:"30"},
  {t:"5³ = ?", p:["125","100","150","75"], j:"125"},
  {t:"(12 x 5) - 20 = ?", p:["30","40","50","60"], j:"40"},
  {t:"2x = 10, x = ?", p:["3","4","5","6"], j:"5"}
];

// 🎮 PILIH LEVEL
function pilihLevel(lvl) {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  if (lvl === "easy") soal = easy;
  if (lvl === "normal") soal = normal;
  if (lvl === "hard") soal = hard;

  document.getElementById("level").innerText = "Level: " + lvl.toUpperCase();
  tampilSoal();
}

// 🧠 TAMPILKAN SOAL
function tampilSoal() {
  resetTimer();
  let s = soal[index];

  document.getElementById("pertanyaan").innerText = s.t;

  let html = "";
  s.p.forEach(p => {
    html += `<button onclick="cek('${p}', this)">${p}</button>`;
  });

  document.getElementById("pilihan").innerHTML = html;
}

// ✅ CEK JAWABAN
function cek(jawab, btn) {
  clearInterval(timer);

  if (jawab === soal[index].j) {
    btn.classList.add("correct");
    score += 10;
    document.getElementById("hasil").innerText = "Benar!";
  } else {
    btn.classList.add("wrong");
    document.getElementById("hasil").innerText = "Salah!";
  }

  document.getElementById("score").innerText = score;

  setTimeout(() => {
    next();
  }, 1000);
}

// ➡️ NEXT
function next() {
  index++;
  if (index < soal.length) {
    tampilSoal();
    document.getElementById("hasil").innerText = "";
  } else {
    document.getElementById("game").innerHTML = `
      <h1>🎉 Selesai!</h1>
      <p>Score: ${score}</p>
      <button onclick="location.reload()">Main Lagi</button>
    `;
  }
}

// ⏱️ TIMER
function startTimer() {
  timer = setInterval(() => {
    waktu--;
    document.getElementById("timer").innerText = waktu;

    if (waktu <= 0) {
      clearInterval(timer);
      document.getElementById("hasil").innerText = "Waktu habis!";
      setTimeout(next, 1000);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  waktu = 15;
  document.getElementById("timer").innerText = waktu;
  startTimer();
}