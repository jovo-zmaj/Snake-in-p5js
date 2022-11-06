let sizee = 500;
let kurac;
let points = 0;
let tileSize = 25;
let guja = [];
let v;
let BRZ = 50;
//reakt document.quertselector akgpeqgo
let k = new p5.Vector(0, 0);
let pv = new p5.Vector(0, 1);
let krj = false;
let brzina,sljdr;

let fr;

let boja=[];


/*function raj() {
  let endScreen = document.createElement("div");
  endScreen.innerHTML = `
    <div class="imas">
        <h1> Izgubio si picko </h1>
        <p>Your score was ${points}</p>
    </div>
    
    `;
  react.appendChild(endScreen);
}
*/
function kraj() {
  krj = true;
}

function createApple() {
  kurac = new p5.Vector(
    int(random(0, floor(sizee / tileSize))),
    int(random(0, floor(sizee / tileSize)))
  );
  guja.forEach((deoGuje) => {
    if (deoGuje.equals(kurac)) {
      createApple();
      return;
    }
  });
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
  if (
    guja[0].x * tileSize > sizee - tileSize ||
    guja[0].y * tileSize > sizee - tileSize ||
    guja[0].x < 0 ||
    guja[0].y < 0
  )
    kraj();

  if (guja[0].equals(kurac)) {
    createApple();
    points++;
    k.set(guja.at(-1));
    naKraj = true;
  }
  for (let i = guja.length - 1; i > 1; i--) {
    if (a.equals(guja[i])) kraj();
    guja[i].set(guja[i - 1].x, guja[i - 1].y);
  }
  if (guja.length != 1) guja[1].set(a);
  if (naKraj) guja.push(new p5.Vector(k.x, k.y));
}

function crtaj() {
  background(boja[0]);
  fill(boja[1]);
  ellipse(kurac.x * tileSize, kurac.y * tileSize, tileSize);
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

  guja.slice(1, guja.length - 1).forEach((deoGuje) => {
    rect(deoGuje.x * tileSize, deoGuje.y * tileSize, tileSize, tileSize);
  });

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

function proveriSlajder(){
  if(int(sljdr.value())!=sizee||int(brzina.value())!=fr||int(tile.value())!=tileSize||boje[int(boj.value())]!=boja)
    setup();
}


function preload(){
  sljdr = createSlider(10,2000,400);
  sljdr.position(0, 0);
  brzina = createSlider(1,50,6);
  brzina.position(0, 20);
  tile = createSlider(1,100,25);
  tile.position(0, 40);
  boj = createSlider(0,boje.length-1,0);
  boj.position(0, 60);
}

function setup() {
  krj = false;
  fr=int(brzina.value());
  frameRate(fr);
  sizee=sljdr.value();
  boja=boje[int(boj.value())];
  tileSize=int(tile.value());
  createCanvas(sizee, sizee);
  select('canvas').position(windowWidth/2-width/2, windowHeight/2-height/2);
  guja = [];
  guja.push(new p5.Vector(0, 0));
  
  createApple();
  noStroke();
  v = new p5.Vector(0, 1);
  textSize(50);
  
  ellipseMode(CORNER);
  rectMode(CORNER);
  noStroke();
  textAlign(CENTER);
  points=0
}

function draw() {
  if(krj)return;
  proveriSlajder();
  zmija();
  crtaj();
  fill(boja[3]);
  text(points,width/2,height/2);
}




