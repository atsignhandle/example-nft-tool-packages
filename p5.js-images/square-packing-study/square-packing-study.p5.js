let margin = 2;
let gap = 8;
let N = 32;
let u = 64;
let palette = ["#4bd3e5", "#fffbe6", "#ffd919", "#ff4f19"];
let shuffleColors = true;

let squares = [];

let randInt = (a, b) => (floor(random(a, b))); 

function setup() {
  createCanvas(N*u, N*u);
  
  shuffle(palette, true);
  background(palette[0]);
  stroke("#2c2060");
  strokeWeight(2);
  
  if (random() < 1/3) {
    if (palette[0] == "#fffbe6") {
      palette = [random(["#4bd3e5", "#ffd919", "#ff4f19"])];
    } else {
      palette = ["#fffbe6"];
    }
  } else if (random() < 1/2) {
    if (palette[0] == "#fffbe6") {
      palette = [palette[1], palette[0]];
    } else {
      palette = ["#fffbe6", palette[0]];
    }
    shuffleColors = false;
  }
  
  for (let i = margin; i < N-margin; i++) {
    for (let j = margin; j < N-margin; j++) {
      drawSquare(i*u+gap/2, j*u+gap/2, u-gap);
    }
  }
}

function draw() {
  let noAddition = true;
  for (let i = 0; i < 500; i++) {
    let newSqu = generateSquare();
    let canAdd = true;
    for (let squ of squares) {
      if (((newSqu.i <= squ.i && newSqu.i+newSqu.s > squ.i) || 
					 (squ.i <= newSqu.i && squ.i+squ.s > newSqu.i)) && 
					((newSqu.j <= squ.j && newSqu.j+newSqu.s > squ.j) || 
					 (squ.j <= newSqu.j && squ.j+squ.s > newSqu.j))) {
        canAdd = false;
        break;
      }
    }
    if (canAdd) {
      drawSquare(newSqu.i*u+gap/2, newSqu.j*u+gap/2, newSqu.s*u-gap);
      squares.push(newSqu);
      noAddition = false;
    }
  }
  
  if (noAddition) noLoop();
}

function generateSquare() {
  let s = randInt(2, 6);
  let i = randInt(margin, N-margin-s+1);
  let j = randInt(margin, N-margin-s+1);
  let squ = {
    i: i,
    j: j,
    s: s
  };
  return squ;
}

function drawSquare(x, y, s) {
  shuffle(palette, shuffleColors);
  
  let i = 0;
  if (random() < 3/4) {
    rectMode(CENTER);
    for (let w = s; w > 0; w -= u/2) {
      fill(palette[(i++)%palette.length]);
      square(x+s/2, y+s/2, w);
    }
  } else {
    rectMode(CORNER);
    push();
    translate(x+s/2, y+s/2);
    rotate(random([0, PI/2]));
    for (let w = 0; w < s; w += u/4) {
      fill(palette[(i++)%palette.length]);
      rect(-s/2, w-s/2, s, u/4);
    }
    pop();
  }
}
