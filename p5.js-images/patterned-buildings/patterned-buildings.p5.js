let canvas;
let palette = [];

function setup() {
  canvas = createCanvas(1200, 1200, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);
}

function draw() {
  palette = [];
  while (palette.length < 5) {
    palette = shuffle(chromotome.get().colors);
  }
  background(0, 0, 95);

  randomSeed(0);
  orbitControl();

  ambientLight(0, 0, 50);
  directionalLight(color(0, 0, 80), 1, 0, -1);
  directionalLight(color(0, 0, 30), -1, 0, -1);
  directionalLight(color(0, 0, 50), 0, 1, 0);

  let offset = width / 15;

  let w = sqrt(width * width + height * height);
  let x = -offset;
  let y = -offset;
  let d = w * 2 + offset * 2;
  let minD = width / 5;

  push();
  translate(0, height / 5, 0);
  rotateX(45 + 180);
  rotateZ(45);
  translate(-w, -w, 0);
  separateGrid(x, y, d, minD);
  pop();

  noLoop();
}

function separateGrid(x, y, d, minD) {
  let sep = int(random(1, 5));
  let w = d / sep;

  push();
  translate(x + d / 2, y + d / 2);
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  rotate((int(random(4)) * 360) / 4);
  translate(-d / 2, -d / 2);

  for (let j = 0; j < sep; j++) {
    for (let i = 0; i < sep; i++) {
      let nx = i * w;
      let ny = j * w;
      if (random(100) < 98 && w > minD) {
        separateGrid(nx, ny, w, minD);
      } else {
        pixelRect(nx, ny, w, w);
      }
    }
  }
  pop();
}

function pixelRect(x, y, w, h, c) {
  let colors = shuffle(palette.concat());

  let density = pow(2, int(random(2, 6)));
  let g = createGraphics(density, density);
  let gradient = g.drawingContext.createLinearGradient(0, 0, 0, g.height);
  for (let i = 0; i < colors.length; i++) {
    let step = map(i, 0, colors.length - 1, 0, 1);
    gradient.addColorStop(step, colors[i]);
  }
  g.noStroke();
  g.drawingContext.fillStyle = gradient;
  g.rect(0, 0, width, height);
  // g.background(colors[0]);
  for (let p = 4; p < colors.length; p++) {
    g.fill(colors[p]);
    let n, k;
    switch (int(random(1, 5))) {
      case 0:
        for (let i = 0; i < density; i++) {
          g.rect(i, i, 1, 1);
        }
        break;
      case 1:
        n = int(random(2));
        for (let i = 0; i < density; i++) {
          if (i % 2 == n) {
            g.rect(i, 0, 1, g.height);
          }
        }
        break;
      case 2:
        k = int(random(2));
        for (let j = 0; j < density; j++) {
          for (let i = 0; i < density; i++) {
            if (j % 2 == (j + k) % 2) {
              g.rect(i, j, 1, 1);
            }
          }
        }
        break;
      case 3:
        k = int(random(2));
        for (let i = 0; i < density; i++) {
          if (i % 2 == k) {
            for (let j = i; j < density; j++) {
              g.rect(i, j, 1, 1);
            }
          }
        }
        break;
      case 4:
        for (let j = 0; j < density; j++) {
          k = j % 2;
          for (let i = 0; i < density; i++) {
            n = j * density + i;
            if (n % 2 == k) {
              g.rect(i, j, 1, 1);
            }
          }
        }
        break;
    }
  }

  let tex = canvas.getTexture(g);
  tex.setInterpolation(NEAREST, NEAREST);
  push();
  let bh = random(w / 2, w * 5);
  translate(x + w / 2, y + w / 2, -bh / 2);
  scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  rotate((int(random(4)) * 360) / 4);
  fill(0, 0, 100);
  noStroke();
  texture(g);
  box(w, w, bh);
    
  
  // noFill();
  // translate(-w / 2, -w / 2,0);
  // image(g, 0, 0, w, w);
  g.remove();
  g = null;
  pop();
}

