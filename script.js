let sizee = 500;
let kurac;
let points = 0;
let tileSize = 25;
let guja = [];
let v;
let BRZ = 50;
let k = new p5.Vector(0, 0);
let pv = new p5.Vector(0, 1);
let krj = false;
let brzina, sljdr;
let fr;

let boja = [];

function kraj() {
	krj = true;
}

function createApple(jabuka) {
	jabuka.set(
		int(random(0, floor(sizee / tileSize))),
		int(random(0, floor(sizee / tileSize)))
	);
	for (let i = 0; i < guja.length; i++) {
		if (guja[i].equals(jabuka)) {
			jabuka.set(
				int(random(0, floor(sizee / tileSize))),
				int(random(0, floor(sizee / tileSize)))
			);
			i = 0;
		}
	}
	return;
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		v.x = -1;
		v.y = 0;
	} else if (keyCode === RIGHT_ARROW) {
		v.x = 1;
		v.y = 0;
	} else if (keyCode === DOWN_ARROW) {
		v.y = 1;
		v.x = 0;
	} else if (keyCode === UP_ARROW) {
		v.y = -1;
		v.x = 0;
	}
	if (krj) setup();
}

function proveri() {
	let newv = new p5.Vector(guja[0].x + v.x, guja[0].y + v.y);
	guja.forEach((deoGuje) => {
		if (deoGuje.equals(newv)) {
			v.set(pv);
			return false;
		}
	});
	pv.set(v);
	return true;
}

function zmija() {
	let naKraj = false;
	if (proveri() == false) return;

	let a = new p5.Vector(0, 0);
	a.set(guja[0]);
	guja[0].add(v);
	k.mult(0);
	kurac.forEach((jabuka) => {
		if (guja[0].equals(jabuka)) {
			createApple(jabuka);
			points++;
			k.set(guja.at(-1));
			naKraj = true;
		}
	});
	for (let i = guja.length - 1; i > 1; i--) {
		if (a.equals(guja[i])) kraj();
		guja[i].set(guja[i - 1].x, guja[i - 1].y);
	}
	if (guja.length != 1) guja[1].set(a);
	if (naKraj) guja.push(new p5.Vector(k.x, k.y));

	guja.forEach((deoGuje) => {
		if (deoGuje.x * tileSize > sizee - tileSize)
			deoGuje.x = 0;
		else if (deoGuje.y * tileSize > sizee - tileSize)
			deoGuje.y = 0;
		else if (deoGuje.x < 0)
			deoGuje.x = sizee / tileSize;
		else if (deoGuje.y < 0)
			deoGuje.y = sizee / tileSize;

	});
}
function pozadina() {
	background(boja[0]);
	fill(boja[0][0], boja[0][1], boja[0][2] + 3);
	let n = (sizee / tileSize);
	for (let i = 0; i < n; i++) {
		for (let j = i % 2 == 0; j < n; j += 2)
			rect(i * tileSize, j * tileSize, tileSize, tileSize);
	}
}

function crtaj() {
	pozadina();
	fill(boja[1]);
	kurac.forEach((jabuka) => {
		ellipse(jabuka.x * tileSize, jabuka.y * tileSize, tileSize);
	});
	fill(boja[2]);
	let kru = 30;
	if (guja.length == 1) {
		ellipse(guja[0].x * tileSize, guja[0].y * tileSize, tileSize);
		return;
	}
	rect(
		guja[0].x * tileSize,
		guja[0].y * tileSize,
		tileSize,
		tileSize,
		(v.y == -1 || v.x == -1) * kru,
		(v.y == -1 || v.x == 1) * kru,
		(v.y == 1 || v.x == 1) * kru,
		(v.y == 1 || v.x == -1) * kru
	);

	let gl, gd, dl, dd, x, y, x2, y2, x3, y3;

	for (let i = 1; i < guja.length - 1; i++) {
		gl = gd = dl = dd = 0;
		x = guja[i].x;
		y = guja[i].y;
		x2 = guja[i - 1].x;
		y2 = guja[i - 1].y;
		x3 = guja[i + 1].x;
		y3 = guja[i + 1].y;
		if ((x < x2 && x == x3 && y < y3) || (x < x3 && x == x2 && y < y2)) gl++;
		else if ((x2 < x && x3 == x && y < y3) || (x3 < x && x2 == x && y < y2))
			gd++;
		else if ((x2 == x && x3 > x && y > y2) || (x == x3 && x < x2 && y > y3))
			dl++;
		else if ((x == x2 && x > x3 && y > y2) || (x == x3 && x > x2 && y > y3))
			dd++;
		rect(
			x * tileSize,
			y * tileSize,
			tileSize,
			tileSize,
			gl * kru,
			gd * kru,
			dd * kru,
			dl * kru
		);
	}

	rect(
		guja.at(-1).x * tileSize,
		guja.at(-1).y * tileSize,
		tileSize,
		tileSize,
		(guja.at(-2).x > guja.at(-1).x || guja.at(-2).y > guja.at(-1).y) * kru,
		(guja.at(-2).x < guja.at(-1).x || guja.at(-2).y > guja.at(-1).y) * kru,
		(guja.at(-2).x < guja.at(-1).x || guja.at(-2).y < guja.at(-1).y) * kru,
		(guja.at(-2).x > guja.at(-1).x || guja.at(-2).y < guja.at(-1).y) * kru
	);
}

function proveriSlajder() {
	if (
		floor(sljdr.value() / tileSize) * tileSize != sizee ||
		int(brzina.value()) != fr ||
		int(tile.value()) != tileSize ||
		boje[int(boj.value())] != boja ||
		kurc.value() != kurac.length
	)
		setup();


}

function preload() {
	sljdr = createSlider(10, 2000, 400);
	sljdr.position(0, 0);
	brzina = createSlider(1, 50, 6);
	brzina.position(0, 20);
	tile = createSlider(1, 100, 25);
	tile.position(0, 40);
	boj = createSlider(0, boje.length - 1, 0);
	boj.position(0, 60);
	kurc = createSlider(1, 100, 1);
	kurc.position(0, 80);


}

function setup() {

	textFont('Montserrat');
	colorMode(HSB);
	krj = false;
	fr = int(brzina.value());
	frameRate(fr);

	boja = boje[int(boj.value())];
	tileSize = int(tile.value());
	sizee = floor(sljdr.value() / tileSize) * tileSize;
	createCanvas(sizee, sizee);
	select("canvas").position(
		windowWidth / 2 - width / 2,
		windowHeight / 2 - height / 2
	);
	guja = [];
	kurac = [];
	guja.push(new p5.Vector(0, 0));

	for (let i = 0; i < kurc.value(); i++) {
		kurac.push(new p5.Vector(0, 0));
		createApple(kurac[i]);
	}

	v = new p5.Vector(0, 1);
	textSize(sizee / 7);

	ellipseMode(CORNER);
	rectMode(CORNER);
	noStroke();
	textAlign(CENTER);
	points = 0;
}

function draw() {
	if (krj) return;
	proveriSlajder();
	zmija();
	crtaj();
	fill(boja[3]);
	if (!krj) {
		text(points, width / 2, height / 2 + height / 16);
	} else {
		text("los si momak.", width / 2, height / 2);
		text(points, width / 2, height / 2 + height / 7);
	}
}
