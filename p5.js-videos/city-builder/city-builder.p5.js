let MARGIN = 64;
let CITY_SIZE = 1200;
let CITY_NAME = '';

let MAJOR_ROAD_CHANCE = 0.99;
let REGULAR_ROAD_FROM_MAJOR_CHANCE = 0.9;
let REGULAR_ROAD_FROM_REGULAR_ROAD_CHANCE = 0.98;
let SMALL_ROAD_FROM_REGULAR_ROAD_CHANCE = 0.95;
let SMALL_ROAD_FROM_SMALL_ROAD_CHANCE = 0.995;

let BUILDING_GROW_SPEED = 0.4;
let BUILDING_FROM_MAJOR_ROAD_CHANCE = 0.8;
let BUILDING_FROM_REGULAR_ROAD_CHANCE = 0.9;
let BUILDING_FROM_SMALL_ROAD_CHANCE = 0.995;

let PERSPECTIVE_SHIFT = 0.55;
let BUILDING_SIZE = 4;
let BUILDING_VARIATION = 0.5;

class Building {
  constructor(position, h, angle) {
    this.position = position.copy();
    this.height = h;
    this.currentHeight = 1;
    this.angle = angle + PI/4;
    this.size = (BUILDING_SIZE + random(BUILDING_VARIATION)) * map(this.position.y, 0, height, 0.95, 1.1);
  }
  update() {
    if (this.currentHeight < this.height) {
      this.currentHeight += BUILDING_GROW_SPEED;
    }
  }
  draw() {
    stroke(20);
    strokeWeight(0.4);
    fill(215);

    beginShape();
    for(let i = 0; i < TAU; i += PI/2) {
      vertex(this.position.x + cos(this.angle + i)*this.size, this.position.y  - (this.currentHeight) + sin(this.angle + i)*this.size*PERSPECTIVE_SHIFT);
      point(this.position.x + cos(this.angle + i)*this.size, this.position.y  - (this.currentHeight) + sin(this.angle + i)*this.size*PERSPECTIVE_SHIFT)
    }
    endShape(CLOSE);
  }
}

class Road {
  constructor(level, position, angle) {
    this.level = level;
    this.position = position.copy();
    this.oldPosition = position.copy();
    this.angle = angle; 
    this.building = true;
    this.done = false;
  }
  update() {
    if (!this.building) {
      return;
    }
    
    // Movement
    this.oldPosition = this.position.copy();
    this.position.add(cos(this.angle)*this.level, sin(this.angle)*this.level*PERSPECTIVE_SHIFT);
    
    // Collision Detection
    if (red(get(this.position.x, this.position.y)) == 230) {
      this.done = true;
    }
    if (this.position.x > width - MARGIN || 
        this.position.y > height - MARGIN || 
        this.position.x < MARGIN || 
        this.position.y < MARGIN) {
      this.done = true;
    }
    
    // Direction Change
    if (random() > 0.99) {
      this.angle += random([-PI/4, -PI/8, PI/8, PI/4]);
    }
    
    // Road Generation
    let randomAngle = this.angle + random([PI/2, -PI/2]);
    let pos = createVector(this.level/1.5, 0).rotate(randomAngle).add(this.position);
    let roadAdded = false;
    if (random() > MAJOR_ROAD_CHANCE && this.level == 5) {
      roads.push(new Road(this.level, pos, randomAngle + random(-0.01,0.01)));
      roadAdded = true;
    } 
    else if (random() > REGULAR_ROAD_FROM_MAJOR_CHANCE && this.level == 5) {
      roads.push(new Road(this.level-2, pos, randomAngle + random(-0.01,0.01)));
      roadAdded = true;
    }
    else if (random() > SMALL_ROAD_FROM_REGULAR_ROAD_CHANCE && this.level == 3) {
      roads.push(new Road(this.level-2, pos, randomAngle));
      roadAdded = true;
    }
    else if (random() > REGULAR_ROAD_FROM_REGULAR_ROAD_CHANCE && this.level == 3) {
      roads.push(new Road(this.level, pos, randomAngle));
      roadAdded = true;
    }
    else if (random() > SMALL_ROAD_FROM_SMALL_ROAD_CHANCE && this.level == 1) {
      roads.push(new Road(this.level, pos, randomAngle));
      roadAdded = true;
    }
    
    if (!roadAdded) {
      pos.mult(1.03);
      if (red(get(pos.x, pos.y)) >= 220) {
        return;
      }
      if (random() > BUILDING_FROM_MAJOR_ROAD_CHANCE && this.level == 5) {
        buildings.push(new Building(pos, random(15, 40), this.angle));
      } else if (random() > BUILDING_FROM_REGULAR_ROAD_CHANCE && this.level == 3) {
        buildings.push(new Building(pos, random(15, 20), this.angle));
      } else if (random() > BUILDING_FROM_SMALL_ROAD_CHANCE && this.level == 1) {
        buildings.push(new Building(pos, random(5, 15), this.angle));
      }
    }
    
    
  }
  draw() {
    if (!this.building) {
      return;
    }
    strokeWeight(this.level);
    stroke(map(this.level, 1, 5, 230, 230));
    line(this.oldPosition.x, this.oldPosition.y, this.position.x, this.position.y);
    if (this.done) {
      this.building = false;
    }
  }
}

let roads = [];
let buidings = [];

function setup() {
  createCanvas(CITY_SIZE + MARGIN*2, CITY_SIZE + MARGIN*2);
  
  MAJOR_ROAD_CHANCE = random(0.98, 0.99);
  REGULAR_ROAD_FROM_MAJOR_CHANCE = random(0.95, 0.98);
  REGULAR_ROAD_FROM_REGULAR_ROAD_CHANCE = random(0.97, 0.99);
  SMALL_ROAD_FROM_REGULAR_ROAD_CHANCE = random(0.95, 0.97);
  SMALL_ROAD_FROM_SMALL_ROAD_CHANCE = random(0.995, 0.998);
  
  roads = [];
  buildings = [];
  
  for (let n = 0; n < floor(random(1, 1)); n++) {
    let p = createVector(random(MARGIN, width-MARGIN), random(MARGIN, height-MARGIN));
      for (let i = 0; i < ceil(random(1, 5)); i++) {
        roads.push(new Road(5, p, random(TWO_PI)));
      }
  }
  background(20);
  stroke(230);
  
  CITY_NAME = generateCityName();
  
  //createLoop({duration:12, gif:true})
}

function generateCityName() {
  return random(['', '', '', '', '', 'Old', 'New', '', '', 'Mount', 'Bay', 'North', 'South', 'Lake']) + ' ' + 
    random(['Wash', 'York', 'Aber', 'Bell', 'Corr', 'Dall', 'Eben', 'Flor', 'Gal', 'Gel', 'Hor', 'Jersey', 'Kil', 'Lam', 'Nash', 'Arl', 'Opp', 'Ober', 'Pewa', 'Mad', 'Lex', 'Lux', 'Sal']) + '' + 
    random(['', 'ville', 'town', 'ington', 'ton', 'port', 'view', 'stead', 'cester', 'chester', 'burg', 'waukee', 'kee', 'ison', 'emburg']) + ' ' +
    random(['', '', '', '', '', 'Island', 'Harbor', 'City'])
}

function draw() {
  roads.forEach(road => { road.draw(); road.update(); });
  buildings.sort((a, b) => a.position.y - b.position.y);
  buildings.forEach(building => { building.draw(); building.update(); });
  
  noStroke();
  fill(220);
  //textSize(32);
  //textAlign(CENTER);
  //text(CITY_NAME, width/2, height - MARGIN/1.7)
}

function mousePressed() {
  // roads = [];
  // for (let i = 0; i < ceil(random(1, 5)); i++) {
  //   roads.push(new Road(5, createVector(random(width/2, width/2), random(width/2, width/2)), random(TWO_PI)));
  // }
  // background(20);
}
