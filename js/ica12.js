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

    seen = false;

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

        // Size check:

        if(2*this.size > Math.min(width, height)){
            this.size = 0.5*Math.min(width,height);
        }

        // Position checkers
        if (this.x + this.size >= width) {
            this.vX = -this.vX;
            this.x = width-this.size;
        }else if (this.x - this.size <= 0) {
            this.vX = -this.vX;
            this.x = this.size;
        }else if (this.y + this.size >= height) {
            this.vY = -this.vY;
            this.y = height-this.size;
        }else if (this.y - this.size <= 0) {
            this.vY = -this.vY;
            this.y = this.size;
        }

        // Update:
        this.x += this.vX;
        this.y += this.vY;
    }

    collisionDetect() {
        this.seen = false;
        for (const ball of ballSet) {
           if (!(this === ball)) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
  
              if (distance < this.size + ball.size) {
                if(ball.size > 2 && !ball.seen && this.size >= ball.size){
                    this.seen = true;
                    this.size += 0.01*ball.size;
                    ball.size *= 0.99
                    ball.vX *= 1.01;
                    ball.vY *= 1.01;
                    if(this.speed > 1){
                        this.vY *= 0.99;
                        this.vX *= 0.99;
                    }
                }
              }
           }
        }
     }

}

let ballSet = [];

for (let i = 0; i < 200; i++) {
    let ballSize = random(3, 4);
    let newBall = new Ball(
        random(0, width),
        random(0, height),
        randomSign()*random(1, 3),
        randomSign()*random(1, 3),
        ballSize,
        random(180, 360),
        random(40,60),
        random(30, 80)
    )
    ballSet.push(newBall);
}

function drawloop(){
    ctx.fillStyle = "#0004";
    ctx.fillRect(0,0,width,height);

    for(const ball of ballSet){
        ball.display();
        ball.updatePosition();
        ball.collisionDetect();
    }
    requestAnimationFrame(drawloop);
}

drawloop();
