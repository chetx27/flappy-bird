const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = 400;
canvas.height = 600;

let birdY = canvas.height / 2;
let birdVelocity = 0;
let gravity = 0.5;
let jump = -10;
let isJumping = false;
let birdWidth = 30;
let birdHeight = 30;

// Pipe settings
let pipeWidth = 60;
let pipeGap = 150;
let pipeVelocity = -2;
let pipes = [];
let pipeInterval = 90;

// Score
let score = 0;

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBird();
    updatePipes();
    checkCollisions();
    drawBird();
    drawPipes();
    drawScore();
    requestAnimationFrame(gameLoop);
}

function updateBird() {
    birdVelocity += gravity;
    birdY += birdVelocity;

    if (birdY + birdHeight > canvas.height || birdY < 0) {
        resetGame();
    }
}

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, birdY, birdWidth, birdHeight);
}

function updatePipes() {
    if (frames % pipeInterval === 0) {
        let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            y: pipeHeight,
        });
    }

    pipes.forEach((pipe, index) => {
        pipe.x += pipeVelocity;

        // Remove pipes when they go off screen
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y); // top pipe
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap); // bottom pipe
    });
}

function checkCollisions() {
    pipes.forEach((pipe) => {
        if (50 + birdWidth > pipe.x && 50 < pipe.x + pipeWidth) {
            if (birdY < pipe.y || birdY + birdHeight > pipe.y + pipeGap) {
                resetGame();
            }
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 30);
}

function resetGame() {
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
}

document.addEventListener('keydown', () => {
    if (birdY > 0) {
        birdVelocity = jump;
    }
});

let frames = 0;
setInterval(() => {
    frames++;
}, 1000 / 60);

gameLoop();
