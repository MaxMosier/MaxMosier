function lInter(percent, start, end) {
	let diff = end - start;
	if (diff < -PI) {
		diff += 2 * PI;
	} else if (diff > PI) {
		diff -= 2 * PI;
	}
	return start + percent * diff;
}

class Entity {
	constructor(x, y, s, a) {
		this.vel = createVector(0, 1);
		this.vel.setMag(s);
		this.vel.setHeading(a);
		this.pos = createVector(x, y);
		this.aRange = 50;
		this.aRangeMin = 30;
		this.oRange = 30;
		this.oRangeMin = 10; // Spacing
		this.otherInfluence = 10;
		this.randomRange = radians(2);
	}

	move() {
		const randomMovement = random(0, 100);
		if (randomMovement <= 10) {
			const newDir =
				this.vel.heading() + random(-1, 1) * this.randomRange;
			this.vel.setHeading(newDir);
		}
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	rev(size) {
		if (!size) {
			size = 5;
		}
		push();
		noStroke();
		fill(236, 219, 193, 127);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		beginShape();
		vertex(0, 0);
		vertex(-size, size);
		vertex(0, -2 * size);
		vertex(size, size);
		endShape(CLOSE);
		pop();
		// stroke(255, 0, 127);
		// strokeWeight(6);
		// point(this.pos.x, this.pos.y);
	}

	modulatePos(xMax, yMax) {
		this.pos.x = (this.pos.x + xMax) % xMax; //Had to add maxes to prevent negative modulo behaviour!
		this.pos.y = (this.pos.y + yMax) % yMax;
	}

	attract(attractor) {
		const distance = this.pos.dist(attractor.pos);
		if (distance <= this.aRange && distance > this.aRangeMin) {
			const angle = lInter(
				map(min(this.aRange, distance), 0, this.aRange, 1, 0) *
					(attractor.s / 100.0),
				this.vel.heading(),
				attractor.a
			);
			this.vel.setHeading(angle);
		}
	}

	flock(other) {
		if (other == this) {
			return;
		}
		const distance = this.pos.dist(other.pos);
		if (distance <= this.oRange && distance > this.oRangeMin) {
			const angle = lInter(
				map(min(this.oRange, distance), 0, this.oRange, 1, 0) *
					(this.otherInfluence / 100.0),
				this.vel.heading(),
				other.vel.heading()
			);
			this.vel.setHeading(angle);
		}
	}
}

class Attractor {
	constructor(x, y, a, strength) {
		this.pos = createVector(x, y);
		if (strength) {
			this.s = strength; // 0 -> 100 : will be normalized elsewhere to 0-1!
		} else {
			this.s = 2;
		}
		this.a = a;
		this.dead = false;
	}

	fade() {
		if (this.s < 1) {
			this.dead = true;
			return true;
		} else {
			this.s--;
			return false;
		}
	}

	rev() {
		strokeWeight(map(this.s, 0, 100, 1, 5));
		stroke(0, 255, 255, map(this.s, 0, 100, 0, 255));
		let drawLine = createVector(0, 1);
		drawLine.setHeading(this.a);
		drawLine.setMag(20 * (this.s / 100));
		line(
			this.pos.x,
			this.pos.y,
			this.pos.x + drawLine.x,
			this.pos.y + drawLine.y
		);
		// point(this.pos.x, this.pos.y);
	}
}
