let score = 0;
let timeLeft = 0;
let gameActive = false;
let timer = null;
let currentMode = 5;
let isBonus = false;
let bonusTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timeDisplay').innerText = 'Time: 0s';
    const modeButton = document.getElementById('modeButton');
    modeButton.addEventListener('click', changeMode);
});

function changeMode() {
    if (gameActive) return;
    
    if (currentMode === 5) currentMode = 10;
    else if (currentMode === 10) currentMode = 15;
    else currentMode = 5;
    
    document.getElementById('modeButton').innerText = `Mode: ${currentMode} Seconds`;
}

function startGame() {
    if (gameActive) return;
    score = 0;
    isBonus = false;
    document.getElementById('scoreDisplay').innerText = 'Score: 0';
    document.getElementById('finalScore').classList.add('hidden');
    document.getElementById('bonusIndicator').classList.add('hidden');
    timeLeft = currentMode;
    gameActive = true;

    document.getElementById('timeDisplay').innerText = `Time: ${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeDisplay').innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        } else if (Math.random() < 0.1 && !isBonus) { // 10% chance each second
            startBonusMode();
        }
    }, 1000);
}

function startBonusMode() {
    isBonus = true;
    document.getElementById('bonusIndicator').classList.remove('hidden');
    document.getElementById('clickButton').classList.add('bonus');
    
    bonusTimer = setTimeout(() => {
        endBonusMode();
    }, 3000); // Bonus lasts 3 seconds
}

function endBonusMode() {
    isBonus = false;
    document.getElementById('bonusIndicator').classList.add('hidden');
    document.getElementById('clickButton').classList.remove('bonus');
}

function endGame() {
    clearInterval(timer);
    if (bonusTimer) clearTimeout(bonusTimer);
    endBonusMode();
    gameActive = false;
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Final Score: ${score}`;
    finalScoreElement.classList.remove('hidden');
    document.getElementById('restartButton').classList.remove('hidden');
}

function restartGame() {
    document.getElementById('finalScore').classList.add('hidden');
    document.getElementById('restartButton').classList.add('hidden');
    score = 0;
    document.getElementById('scoreDisplay').innerText = 'Score: 0';
    document.getElementById('timeDisplay').innerText = 'Time: 0s';
    startGame();
}

function addScore() {
    if (!gameActive) {
        startGame();
        return;
    }
    score += isBonus ? 2 : 1;
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
}

let scoreDisplay = document.getElementById("scoreDisplay");
let clickButton = document.getElementById("clickButton");
