function showWishes() {
    document.getElementById("wishes-container").classList.remove("hidden");
    startConfetti();
}

// Hiệu ứng bắn pháo giấy
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiArray = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 + 1
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiArray.forEach((confetti) => {
        ctx.fillStyle = confetti.color;
        ctx.beginPath();
        ctx.arc(confetti.x, confetti.y, confetti.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateConfetti() {
    confettiArray.forEach((confetti, index) => {
        confetti.y += confetti.speedY;
        confetti.x += confetti.speedX;
        if (confetti.y > canvas.height) {
            confettiArray[index].y = 0;
        }
    });
}

function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    createConfetti();
    animateConfetti();
}
