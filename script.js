let score = 0;
let timeLeft = 0;
let gameActive = false;
let timer = null;
let currentMode = 5;
let isBonus = false;
let bonusTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  const modeButton = document.getElementById("modeButton");
  if (modeButton) {
    modeButton.addEventListener("click", changeMode);
  }
});

function changeMode() {
  if (gameActive) return;

  console.log("Mode button clicked! Current mode:", currentMode);

  if (currentMode === 5) {
    currentMode = 10;
  } else if (currentMode === 10) {
    currentMode = 15;
  } else {
    currentMode = 5;
  }

  document.getElementById(
    "modeButton"
  ).innerText = `Mode: ${currentMode} Seconds`;
  console.log("Mode changed to:", currentMode);
}

const startButton = document.querySelector(".ButtonPlay");
const restartButton = document.querySelector(".ButtonRestart");
const timeDisplay = document.querySelector(".BoxWaktu p");
const speedDisplay = document.querySelector(".BoxKecepatan p");
const scoreDisplay = document.querySelector(".BoxNilai p");

let clicks = 0;
let isPlaying = false;
let gameOver = false;

restartButton.style.visibility = "hidden";

async function startGame() {
  if (isPlaying || gameOver) return;
  isPlaying = true;
  clicks = 0;
  startButton.innerHTML = "Klik secepat mungkin!";
  restartButton.style.visibility = "hidden";

  let startTime = Date.now();
  let interval = setInterval(() => {
    let elapsed = (Date.now() - startTime) / 1000;
    timeDisplay.innerHTML = `Waktu: ${elapsed.toFixed(2)}s`;
    speedDisplay.innerHTML = `Kecepatan: ${(clicks / elapsed).toFixed(
      2
    )} klik/detik`;
    scoreDisplay.innerHTML = `Nilai: ${clicks}`;
  }, 100);

  document.body.addEventListener("click", registerClick);

  await new Promise((resolve) => setTimeout(resolve, currentMode * 1000));

  document.body.removeEventListener("click", registerClick);
  clearInterval(interval);
  isPlaying = false;
  gameOver = true;
  displayResult();
}

function registerClick() {
  if (isPlaying) {
    clicks++;
  }
}

function displayResult() {
  const rank = getRanking(clicks);
  startButton.innerHTML = `Peringkat: ${rank}`;
  restartButton.style.visibility = "visible";
}

function getRanking(clicks) {
  if (clicks >= 50) return "Legend";
  if (clicks >= 30) return "Pro";
  if (clicks >= 15) return "Amatir";
  return "Pemula";
}

function restartGame() {
  timeDisplay.innerHTML = "Waktu: 0s";
  speedDisplay.innerHTML = "Kecepatan: 0 klik/detik";
  scoreDisplay.innerHTML = "Nilai: 0";
  startButton.innerHTML = "Klik disini";
  clicks = 0;
  isPlaying = false;
  gameOver = false;
  restartButton.style.visibility = "hidden";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function createRipple(event) {
  const button = event.currentTarget;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

document.querySelector(".ButtonPlay").addEventListener("click", createRipple);
document
  .querySelector(".ButtonRestart")
  .addEventListener("click", createRipple);
