const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSign(){
    return 2*Math.floor(Math.random()*2)-1;
}

// Obsolete :
function randomHSL(hMin, hMax, sMin, sMax, lMin, lMax) {
    return `hsl(${random(hMin, hMax)},${random(sMin, sMax)}%,${random(lMin, lMax)}%)`;
}

function toHSL(iH, iS, iL){
    return `hsl(${iH},${iS}%,${iL}%)`;
}

class Ball {

    constructor(x, y, vX, vY, size, h, s, l) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.size = size;

        this.h = h;
        this.s = s;
        this.l = l;
    }

    display() {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    updatePosition() {
        if (this.x + this.size >= width) {
            this.vX = -this.vX;
            this.x = width-this.size;
        }

        if (this.x - this.size <= 0) {
            this.vX = -this.vX;
            this.x = this.size;
        }

        if (this.y + this.size >= height) {
            this.vY = -this.vY;
            this.y = height-this.size;
        }

        if (this.y - this.size <= 0) {
            this.vY = -this.vY;
            this.y = this.size;
        }

        this.x += this.vX;
        this.y += this.vY;
    }

    collisionDetect() {
        for (const ball of ballSet) {
           if (!(this === ball)) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
  
              if (distance < this.size + ball.size) {
                ball.h += 10;
                this.h += 10;
              }
           }
        }
     }

}

let ballSet = [];

for (let i = 0; i < 500; i++) {
    let ballSize = random(8, 14);
    let newBall = new Ball(
        random(0, width),
        random(0, height),
        randomSign()*random(1, 5),
        randomSign()*random(1, 5),
        ballSize,
        random(60, 300),
        random(40,60),
        random(30, 80)
    )
    ballSet.push(newBall);
}

function drawloop(){
    ctx.fillStyle = "#0001";
    ctx.fillRect(0,0,width,height);

    for(const ball of ballSet){
        ball.display();
        ball.updatePosition();
    }
    requestAnimationFrame(drawloop);
}

drawloop();
