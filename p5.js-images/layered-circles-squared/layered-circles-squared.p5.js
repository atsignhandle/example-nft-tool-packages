let angleSepMin, angleSepMax, angleStepMin, angleStepM;
let url = ["https://coolors.co/fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a", ];
let palette;
let c,pc = -1;
let alpha = 75;

function setup() {
  createCanvas(1200, 1200);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

}

function draw() {
  palette = shuffle(createPalette(random(url)), true);

  c = palette[0];
  palette.shift();
  background(c);

  let offset = width / 20;
  let x = offset;
  let y = offset;
  let d = width - 2 * offset;
  for (let i = 0; i < 1; i++) {
    recursiveRect(x, y, d, this);
  }
  noLoop();
}

function recursiveRect(x, y, d, g) {
  let step = int(random(1, 4));
  let w = d / step;
  for (let j = 0; j < step; j++) {
    for (let i = 0; i < step; i++) {
      let nx = x + i * w;
      let ny = y + j * w;
      if (random(100) < 90 && w > width / 3) {
        recursiveRect(nx, ny, w, g);
      } else {
        push();
        stroke(0, 0, 0, alpha);
        rectMode(CENTER);
        strokeWeight(2);

        rect(nx + w / 2, ny + w / 2, w - 10, w - 10);
        drawingContext.clip();
        circularGraphics(nx + w / 2, ny + w / 2, w * sqrt(2));
        pop();
      }
    }
  }
}


function circularGraphics(cx, cy, rMax) {
  let colors = shuffle(createPalette(random(url)), true);

  let a = int(random(1, 5));
  let b = int(random(1, 5));
  let c = int(random(1, 5));
  let d = int(random(1, 5));

  angleSepMin = min(a, b);
  angleSepMax = max(a, b);

  angleStepMin = min(c, d);
  angleStepMax = max(c, d);
  let rSep = int(random(2, 7));

  // randomSeed(0);
  push();
  translate(cx, cy);
  for (let r = rMax / 2; r > 0; r -= rMax / rSep) {
    let r2 = r - rMax / 10;
    let isFirstBigger = random() > 0.5;
    let startAngle = 0; //random(360);
    let angleNum = int(random(angleSepMin, angleSepMax)) * int(random(angleStepMin, angleStepMax));
    let angleWidth = (2 * PI * (isFirstBigger ? r : r2)) / angleNum;
    let angleStep = 360 / angleNum;
    let f = int(random(2, 5));
    drawingContext.shadowColor = color(0, 0, 0, 10);
    drawingContext.shadowBlur = width / 20;
    angleWidth / 3;
    if (r < rMax / 2 * 0.8) drawingContext.shadowBlur = 0;

    push();
    fill(random(colors));
    strokeWeight(2);
    stroke(0, 0, 0, alpha);
    circle(0, 0, r * 2);

    drawingContext.clip();
    drawingContext.shadowBlur = angleWidth / 3;

    for (let angle = startAngle; angle < startAngle + 360; angle += angleStep) {
      let x = cos(angle) * (isFirstBigger ? r : r2);
      let y = sin(angle) * (isFirstBigger ? r : r2);
      for (let e = 1; e > 0; e -= 1 / f) {
        push();
        translate(x, y);
        rotate(angle - 90);
        scale(e);
        strokeWeight(1 / e);
        stroke(0, 0, 0, alpha);
        fill(random(palette));
        ellipse(0, 0, angleWidth, angleWidth);
        pop();
      }
    }

    startAngle = random(360);
    angleNum = int(random(angleSepMin, angleSepMax)) * int(random(angleStepMin, angleStepMax));
    angleWidth = (2 * PI * (isFirstBigger ? r2 : r)) / angleNum;
    angleStep = 360 / angleNum;
    f = int(random(2, 5));
    for (let angle = startAngle; angle < startAngle + 360; angle += angleStep) {
      let x = cos(angle) * (isFirstBigger ? r2 : r);
      let y = sin(angle) * (isFirstBigger ? r2 : r);
      for (let e = 1; e > 0; e -= 1 / f) {
        push();
        translate(x, y);
        rotate(angle - 90);
        scale(e);
        strokeWeight(1 / e);
        stroke(0, 0, 0, alpha);
        let c1 = pc;
        while(c1 == pc){
          c1 = random(palette);
        }
        fill(c1);
        pc = c1;
        ellipse(0, 0, angleWidth, angleWidth);
        pop();
      }
    }
    pop();
  }
  pop();
}



function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color('#' + arr[i]);
  }
  return arr;
}

function keyPressed() {
  // save();
}
