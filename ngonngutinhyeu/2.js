function showWishes() {
    document.getElementById("wishes-container").classList.remove("hidden");
    startConfetti();
}

// Hiệu ứng bắn pháo giấy
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Đảm bảo canvas luôn vừa với kích thước màn hình điện thoại
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let confettiArray = [];

function createConfetti() {
    confettiArray = []; // Đặt lại danh sách để tránh quá tải
    for (let i = 0; i < 80; i++) { // Giảm số lượng để phù hợp hơn với màn hình nhỏ
        confettiArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: Math.random() * 1.5 - 0.75,
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

// Tự động phát nhạc khi mở trang (nếu được trình duyệt cho phép)
window.addEventListener("load", function () {
    const audio = document.getElementById("audio-player");
    audio.volume = 0.5; // Giảm âm lượng tránh gây khó chịu
    audio.play().catch(error => console.log("Tự động phát nhạc bị chặn:", error));
});
