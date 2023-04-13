const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, vX, vY, color, size) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.size = size;
    }

    display() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    updatePosition() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }

        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }

        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }

        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

let ballSet = [];

for (let i = 0; i < 50; i++) {
    let ballSize = random(8, 28);
    let newBall = new Ball(
        random(0, width),
        random(0, height),
        random(-2, 2),
        random(-2, 2),
        randomRGB(),
        ballSize
    )
    ballSet.push(newBall);
}

function drawloop(){
    ctx.fillStyle = "#0004";
    ctx.fillRect(0,0,width,height);

    for(const ball of ballSet){
        ball.display();
        ball.updatePosition();
    }
    requestAnimationFrame(drawloop);
}

drawloop();
