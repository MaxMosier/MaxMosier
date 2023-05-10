let entities = [];
let attractors = [];
var w = window.innerWidth;
var h = window.innerHeight; 

let pathVisible = true;
let pathButton;

function updateOtherInfluence(value) {
	for (let entity of entities) {
	  entity.otherInfluence = value;
	}
}

function randomizeEntities() {
	for (let entity of entities) {
	  entity.vel.setHeading(random(0, 2 * PI));
	  entity.pos.x = random(0, width);
	  entity.pos.y = random(0, height);
	}
}

function updateAttractorRange(value) {
	for (let entity of entities) {
	  entity.aRange = value;
	  entity.aRangeMin = Math.min(3 / 5 * value, 45);
	}
}

function addEntities(num) {
	const newTotal = Math.min(entities.length + num, 750);
	while (entities.length < newTotal) {
	  entities.push(new Entity(random(width), random(height), random(2, 6), random(0, 2 * PI)));
	}
}
  
  function removeEntities(num) {
	const newTotal = Math.max(entities.length - num, 10);
	entities.length = newTotal;
}

function setup() {
	let window = createCanvas(w,h);
	window.parent("canvas-container");
	frameRate(30);

	for (let i = 0; i < 200; i++) {
		entities.push(
			new Entity(random(width), random(height), random(2, 6), random(0, 2 * PI))
		);
	}

	const slider1 = document.getElementsByClassName('slider')[0];
	slider1.value = 10;
	slider1.min = 0;
	slider1.max = 100;
	slider1.addEventListener('input', (e) => {
  		updateOtherInfluence(e.target.value);
	});

	const slider2 = document.getElementsByClassName('slider')[1];
	slider2.value = 50;
	slider2.min = 10;
	slider2.max = 200;
	slider2.addEventListener('input', (e) => {
  		updateAttractorRange(e.target.value);
	});

	pathButton = document.getElementById('path-button');
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
    if (!pathVisible) {
		pathButton.style.boxShadow = "";
		pathButton.textContent = "Paths: Hidden";
	  } else {
		pathButton.style.boxShadow = "";
		pathButton.textContent = "Paths: Shown";
	  }
}