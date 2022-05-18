// By Roni Kaufman
// https://ronikaufman.github.io/
// https://twitter.com/KaufmanRoni

// Made for @sableRaph's weekly creative challenge on Twitch (#WCCChallenge)
// https://www.twitch.tv/sableraph
// "minimalism the comeback, the awakening, the revenge Volume II Part 1 Return of the theme"

function setup() {
  createCanvas(1200, 1200);
  strokeWeight(1);
  noLoop();
}

function draw() {
  let col1 = "#fffbe6";
  let col2 = "#262104";
  
  background(col1);
  stroke(col2);
  
  let n = random([2, 3, 3, 4]);
  let margin = 80; // margin all around
  let gap = 60/n; // gap between two big squares
  let s = (width - 2*margin - (2*n-1)*gap)/(2*n); // size of big square
  let u = s/n; // size of small unit square
	let column = 0; // counts columns
	let flipColumns = random() < 1/2; // whether the colums flip
  
  for (let x = margin; x < width - margin; x += s + gap) {
		
		// draw empty squares
    fill(col2);
    for (let y  = margin; y < width - margin; y += s + gap) {
      rect(x, y, s);
    }
    
    fill(col1);
    
    let tl = createVector(x, margin); // top left corner
    let br = createVector(x+s, margin+s); // bottom right corner
		
		if (column % 2 == 1) {
			// column goes the other way
			tl.y = height - s - margin;
			br.y = height - margin;
		}
    
    let horiz = n-1; // number of possible movements horizontally
    let verti = n-1; // number of possible movements vertically
    for (let i = 0; i < 2*n-1; i++) {
      rect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
      if ((random() < 1/2 || verti == 0) && horiz > 0) {
        if (random() < 1/2) {
          tl.x += u; // left
        } else {
          br.x -= u; // right
        }
        horiz--;
      } else {
        if (random() < 1/2) {
          tl.y += u; // top
        } else {
          br.y -= u; // bottom
        }
        verti--;
      }
	
      tl.y += (s + gap) * ((column % 2 == 0) ? 1 : -1);
      br.y += (s + gap) * ((column % 2 == 0) ? 1 : -1);
    }
		
		if (flipColumns) column++;
  }
}
