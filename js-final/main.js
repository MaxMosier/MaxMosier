let entities = [];
let attractors = [];
var w = window.innerWidth;
var h = window.innerHeight; 

let pathVisible = true;

function setup() {
	let window = createCanvas(w,h);
	window.parent("canvas-container");
	frameRate(30);

	for (let i = 0; i < 400; i++) {
		entities.push(
			new Entity(random(width), random(height), random(2, 6), random(0, 2 * PI))
		);
	}
}

function draw() {
	clear();
	for (let entity of entities) {
		entity.move();
		entity.modulatePos(width, height);
		entity.rev(8);
		for (let attractor of attractors) {
			entity.attract(attractor);
		}
		for (let other of entities) {
			entity.flock(other);
		}
	}
	if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0 && !(pmouseX == mouseX && pmouseY == mouseY)) {
		const attDirection = createVector(mouseX - pmouseX, mouseY - pmouseY);
		const newStrength = min(10, attDirection.mag())*10*0.9;
		attractors.push(new Attractor(mouseX, mouseY, attDirection.heading(), newStrength));
	}
	for (let a = 0; a < attractors.length; a++) {
		if (pathVisible) {
			attractors[a].rev();
		}
		if (attractors[a].fade()) {
			attractors.splice(a, 1);
			a--;
		}
	}
}

function togglePathVisibility() {
	pathVisible = !pathVisible;
}