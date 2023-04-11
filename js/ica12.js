const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
}

function randomRGB(){
    return `rgb(${random(0, 255)},rgb(${random(0, 255)},rgb(${random(0, 255)})`
}

class Ball{

    constructor(x, y, vX, vY, color, size) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.size = size;
    }

    display(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this,y, this.size, 0, 2*Math.PI);
        ctx.fill();

    }

    updatePosition(){
        this.x += this.vX;
        this.y += this.vY;
    }
}

let ballSet = [];
for(let i = 0; i < 50; i++){
    ballSet.push(new Ball(random(0, width),random(0, height), random(-2,2), random(-2,2), randomRGB(), random(8,34)));
    ballSet[i].draw();
}