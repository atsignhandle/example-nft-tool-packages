var width
var height
var cnv
var colorset = 
[[[0],["#540d6e"],["#ee4266"],["#ffd23f"],["#3bceac"],["#0ead69"],["#6fd08c"],["#7b9ea8"],["#daffef"],["#d3c0d2"],["#0cce6b"]],
 [[1],["#000000"],["#cf5c36"],["#eee5e9"],["#7c7c7c"],["#efc88b"],["#2978a0"],["#06bcc1"],["#7293a0"],["#45b69c"],["#21d19f"]],
 [[2],["#006e90"],["#f18f01"],["#adcad6"],["#99c24d"],["#41bbd9"],["#373d20"],["#717744"],["#766153"],["#2d1e2f"],["#6a2e35"]],
 [[3],["#065143"],["#129490"],["#70b77e"],["#e0a890"],["#ce1483"],["#f5b700"],["#dc0073"],["#050517"],["#cf5c36"],["#483c46"]],
 [[4],["#353531"],["#ec4e20"],["#ff9505"],["#016fb9"],["#000000"],["#dbc2cf"],["#9fa2b2"],["#f374ae"],["#ad7a99"],["#b2cede"]],
 [[5],["#221d23"],["#4f3824"],["#d1603d"],["#ddb967"],["#d0e37f"],["#56e39f"],["#59c9a5"],["#4d7ea8"],["#b6c2d9"],["#eacdc2"]],
 [[6],["#255957"],["#437c90"],["#eeebd3"],["#a98743"],["#f7c548"],["#ff99c9"],["#330c2f"],["#7b287d"],["#6d213c"],["#946846"]],
 [[7],["#222e50"],["#007991"],["#439a86"],["#bcd8c1"],["#e9d985"],["#023618"],["#eaf2ef"],["#b26e63"],["#e03616"],["#fff689"]],
 [[8],["#f75590"],["#fce4d8"],["#fbd87f"],["#b5f8fe"],["#10ffcb"],["#808f87"],["#631a86"],["#302f4d"],["#120d31"],["#6689a1"]], //pink 
 [[9],["#db5461"],["#ffd9ce"],["#593c8f"],["#8ef9f3"],["#171738"],["#050505"],["#31afd4"],["#119da4"],["#040404"],["#99d5c9"]],
 [[10],["#512d38"],["#b27092"],["#f4bfdb"],["#ffe9f3"],["#87baab"],["#88958d"],["#606d5d"],["#197278"],["#a9ddd6"],["#91adc2"]],
 [[11],["#274060"],["#335c81"],["#65afff"],["#1b2845"],["#5899e2"],["#b3001b"],["#ccad8f"],["#b2aa8e"],["#dbfe87"],["#a6ece0"]],
 [[12],["#f1bf98"],["#e1f4cb"],["#bacba9"],["#717568"],["#3f4739"],["#32373b"],["#4a5859"],["#c83e4d"],["#222222"],["#1c5d99"]],
 [[13],["#3a3335"],["#d81e5b"],["#f0544f"],["#fdf0d5"],["#c6d8d3"],["#848fa5"],["#e5dcc5"],["#c1edcc"],["#b0c0bc"],["#c0bcb5"]],
 [[14],["#0d1321"],["#731dd8"],["#48a9a6"],["#e4dfda"],["#d4b483"],["#c1666b"],["#484041"],["#fe5d26"],["#885053"],["#fe5f55"]],
 [[15],["#0b3954"],["#bfd7ea"],["#ff6663"],["#fcde9c"],["#fefffe"],["#c2a83e"],["#20fc8f"],["#eeb868"],["#e0ff4f"],["#edb458"]],
 [[16],["#03120e"],["#9ac2c9"],["#8aa1b1"],["#4a5043"],["#ffcb47"],["#3e505b"],["#26413c"],["#1a1d1a"],["#b9d8c2"],["#f3b391"]],
 [[17],["#b9d8c2"],["#9ac2c9"],["#8aa1b1"],["#4a5043"],["#ffcb47"],["#3e505b"],["#26413c"],["#1a1d1a"],["#03120e"],["#f3b391"]], 
 [[18],["#363732"],["#61d095"],["#e0bad7"],["#53d8fb"],["#2a4747"],["#31493c"],["#001a23"],["#4281a4"],["#48bf84"],["#439775"]],
 [[19],["#393e41"],["#d3d0cb"],["#e2c044"],["#587b7f"],["#1e2019"],["#fe5f55"],["#fe64a3"],["#21a179"],["#ea526f"],["#c1292e"]],
 [[20],["#360568"],["#5b2a86"],["#7785ac"],["#9ac6c5"],["#a5e6ba"],["#e5ffde"],["#5dd9c1"],["#acfcd9"],["#c8ad55"],["#d0fcb3"]]
]
//stroke,door frame,door,roof&fence,
var cr
var sw
var buildingMax
var floorMax
let floorAmount=[]
let rooms=[]
var colorR
let overAllTexture

function swap(a,tmpa,tmpb){
	var tmp=colorset[a.cr][tmpa]
	colorset[a.cr][tmpa]=colorset[a.cr][tmpb]
	colorset[a.cr][tmpb]=tmp
}
function centerCanvas() {
	let x = (windowWidth - width) / 2;
	let y = (windowHeight - height) / 2;
	cnv.position(x, y);
}
function windowResized() {
	centerCanvas();
//	resizeCanvas(windowHeight, windowHeight);
}

function setup() {
	cnv=createCanvas(windowHeight, windowHeight);
	width=windowHeight
	height=windowHeight
	centerCanvas();
	overAllTexture=createGraphics(width, height)
	overAllTexture.loadPixels()
	for(var i=0;i<width;i++){
		for(var o=0;o<height;o++){
				overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
		}
	}
	overAllTexture.updatePixels()
	//frameRate(25)
	sw=width/400
	cr=floor(random()*colorset.length)
	colorR=floor(random()*4)
	buildingMax=floor(random()*4+6) //6~10
	floorMax=buildingMax+1
	for(var i=0;i<buildingMax;i++){
		floorAmount[i]=floor(random()*floorMax+2) //2~5
		//print(floorAmount[i])
	}
	
	for(var i=0;i<buildingMax;i++){
		for(var j=0;j<floorMax;j++){
			var tmp=0
			if(j<floorAmount[i])
				tmp=1
			
    	rooms.push(new room(i*buildingMax+j,i,j,tmp));
		}
	}
	/*
	var mono=0
	if(colorR==0)
		mono=1
	window.$fxhashFeatures = {
	"Building": buildingMax,
	"Highest": floorMax,
	"ColorSet": cr,
	"Monotone": mono
	}
	*/
}

function draw() {
		if(colorR==0)//單色、三色、彩色
			background(colorset[cr][1])		
		else //if(colorR==1)
			background(colorset[cr][1])
	//	else
	//		background(colorset[cr][1])
	//print(rooms.length)
	stroke(colorset[cr][1])
	for(var i=0;i<rooms.length;i++){		
		if(colorR==0)//單色、三色、彩色
			fill("white") 		
		else //if(colorR==1)
			fill(rooms[i].roomC)
//		else
//			fill(colorset[cr][i%9+2])
	
		if(rooms[i].exist==1)
			drawFloor(rooms[i])
	}
	push()
	blendMode(MULTIPLY)
	image(overAllTexture,0,0)
	pop()
}

function drawFloor(r){
	rect(r.x,r.y,r.ww,r.hh)
	quad(r.x+r.ww,r.y,r.x+r.ww,r.y+r.hh,r.x+r.ww+r.ww/4,r.y+r.hh+r.ww/4/2,r.x+r.ww+r.ww/4,r.y+r.ww/4/2) //3D
	var doorW=r.ww*0.35
	var doorH=r.hh*0.9
	var doorFrame=doorW*0.1
	var windowW=r.ww*0.35*0.65
	var windowH=windowW*1.4/0.8
		if(colorR==0)//單色、三色、彩色
			fill("white") 		
		else //if(colorR==1)
			fill(colorset[cr][2]) //門框
//		else
//			fill(colorset[cr][r.number%6+5])
	if(r.roomStyle==0){
		//middle door
		rect(r.x+r.ww/2-doorW/2,r.y+r.hh-doorH,doorW,doorH)	
		rect(r.x+r.ww/2-doorW/2+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)	
		drawDoor(r.doorStyle,r.x+r.ww/2-doorW/2+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)
		//window
		drawWindow(r.windowStyle1,r.dark,r.x+(r.ww-doorW)/4-windowW/2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle2,r.dark,r.x+r.ww-(r.ww-doorW)/4-windowW/2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
	}
	else if(r.roomStyle==1){
		//right door
		rect(r.x+r.ww-doorW,r.y+r.hh-doorH,doorW,doorH)	
		rect(r.x+r.ww-doorW+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)	
		drawDoor(r.doorStyle,r.x+r.ww-doorW+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)
		//window
		drawWindow(r.windowStyle1,r.dark,r.x+(r.ww-doorW-windowW*2)/2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle2,r.dark,r.x+(r.ww-doorW-windowW*2)/2+windowW,r.y+r.hh-doorH+doorFrame,windowW,windowH)
	}
	else if(r.roomStyle==2){
		//left door
		rect(r.x,r.y+r.hh-doorH,doorW,doorH)	
		rect(r.x+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)	
		drawDoor(r.doorStyle,r.x+doorFrame,r.y+r.hh-doorH+doorFrame,doorW-doorFrame*2,doorH-doorFrame)
		//window
		drawWindow(r.windowStyle1,r.dark,r.x+doorW+(r.ww-doorW-windowW*2)/2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle2,r.dark,r.x+doorW+(r.ww-doorW-windowW*2)/2+windowW,r.y+r.hh-doorH+doorFrame,windowW,windowH)
	}
	else if(r.roomStyle==3){
		//no door
		//window
		drawWindow(r.windowStyle1,r.dark,r.x+(r.ww-windowW*4)/2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle2,r.dark,r.x+(r.ww-windowW*4)/2+windowW,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle3,r.dark,r.x+(r.ww-windowW*4)/2+windowW*2,r.y+r.hh-doorH+doorFrame,windowW,windowH)
		drawWindow(r.windowStyle4,r.dark,r.x+(r.ww-windowW*4)/2+windowW*3,r.y+r.hh-doorH+doorFrame,windowW,windowH)
	}
	if(r.floors!=0)
		drawFence(r)
	if(r.floors==floorAmount[r.building]-1||r.floors==floorMax-1){
		drawRoof(r)
	}
}

function drawRoof(r){
		if(colorR==0)//單色、三色、彩色
			fill("white") 		
		else //if(colorR==1)
			fill(colorset[cr][4])	
//		else
//			fill(colorset[cr][r.number%10+1])
	if(r.roofStyle==2)
		quad(r.x+r.ww,r.y-r.hh/20*4,r.x+r.ww,r.y,r.x+r.ww+r.ww/4,r.y+r.ww/4/2,r.x+r.ww+r.ww/4,r.y-r.hh/20*4+r.ww/4/2) //3D
	else
		quad(r.x+r.ww,r.y-r.hh/20*5,r.x+r.ww,r.y,r.x+r.ww+r.ww/4,r.y+r.ww/4/2,r.x+r.ww+r.ww/4,r.y-r.hh/20*5+r.ww/4/2) //3D	
	quad(r.x+r.ww,r.y-r.hh/20,r.x+r.ww,r.y,r.x+r.ww+r.ww/4,r.y+r.ww/4/2,r.x+r.ww+r.ww/4,r.y-r.hh/20+r.ww/4/2) //3D
	if(r.roofStyle==0){
		rect(r.x,r.y-r.hh/20-r.hh/20*4,r.ww,r.hh/20*4)
		rect(r.x+r.hh/20,r.y-r.hh/20-r.hh/20*4+r.hh/20,r.ww-r.hh/20-r.hh/20,r.hh/20*4-r.hh/20)
		rect(r.x,r.y-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.roofStyle==1){
		beginShape()
		vertex(r.x,r.y)
		vertex(r.x,r.y-r.hh/20*5)
		vertex(r.x+r.ww/2,r.y-r.hh/20*10)
		vertex(r.x+r.ww,r.y-r.hh/20*5)
		vertex(r.x+r.ww,r.y)
		endShape(CLOSE)
		beginShape()
		vertex(r.x,r.y)
		vertex(r.x,r.y-r.hh/20*4)
		vertex(r.x+r.ww/2,r.y-r.hh/20*9)
		vertex(r.x+r.ww,r.y-r.hh/20*4)
		vertex(r.x+r.ww,r.y)
		endShape(CLOSE)
		rect(r.x,r.y-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.roofStyle==2){
		beginShape()
		vertex(r.x+r.ww/8,r.y-r.hh/20*2)
		vertex(r.x+r.ww/8,r.y-r.hh/20*5-r.hh/20*2)
		vertex(r.x+r.ww/8+r.ww/16,r.y-r.hh/20*5-r.hh/20*2)
		vertex(r.x+r.ww/2,r.y-r.hh/20*10-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8-r.ww/16,r.y-r.hh/20*5-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8,r.y-r.hh/20*5-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8,r.y-r.hh/20*2)
		endShape(CLOSE)
		beginShape()
		vertex(r.x+r.ww/8,r.y-r.hh/20*2)
		vertex(r.x+r.ww/8,r.y-r.hh/20*4-r.hh/20*2)
		vertex(r.x+r.ww/8+r.ww/16,r.y-r.hh/20*4-r.hh/20*2)
		vertex(r.x+r.ww/2,r.y-r.hh/20*9-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8-r.ww/16,r.y-r.hh/20*4-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8,r.y-r.hh/20*4-r.hh/20*2)
		vertex(r.x+r.ww-r.ww/8,r.y-r.hh/20*2)
		endShape(CLOSE)
		rect(r.x,r.y-r.hh/20-r.hh/20*3,r.ww,r.hh/20*3)
		rect(r.x,r.y-r.hh/20-r.hh/20*2,r.ww,r.hh/20*2)
		ellipse(r.x+r.ww/2,r.y-r.hh/20-r.hh/20*4,r.hh/20*2*3)
		ellipse(r.x+r.ww/2,r.y-r.hh/20-r.hh/20*4,r.hh/20*2*2)
		rect(r.x,r.y-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.roofStyle==3){
		rect(r.x,r.y-r.hh/20*5,r.ww,r.hh/20*2)
		for(var i=0;i<21;i+=2){
			rect(r.x+r.ww/21*i,r.y-r.hh/20*5,r.ww/21,r.hh/20*5)
		}
		rect(r.x,r.y-r.hh/20*5,r.ww,r.hh/20)
		rect(r.x,r.y-r.hh/20,r.ww,r.hh/20)
	}	
}

function drawFence(r){
		if(colorR==0)//單色、三色、彩色
			fill("white") 		
		else //if(colorR==1)
			fill(colorset[cr][4])
//		else
//			fill(colorset[cr][r.number%7+4])
	if(r.fenceStyle==0){
		rect(r.x,r.y+r.hh-r.hh/20*5,r.hh/20/2,r.hh/20*5)
		rect(r.x+r.ww-r.hh/20/2,r.y+r.hh-r.hh/20*5,r.hh/20/2,r.hh/20*5)
		rect(r.x+r.hh/20/2,r.y+r.hh-r.hh/20*5,r.ww-r.hh/20,r.hh/20)
		rect(r.x+r.hh/20/2,r.y+r.hh-r.hh/20-r.hh/20*2,r.ww-r.hh/20,r.hh/20*2)
		rect(r.x,r.y+r.hh-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.fenceStyle==1){
		rect(r.x+r.hh/20/2,r.y+r.hh-r.hh/20*5,r.ww-r.hh/20,r.hh/20)
		rect(r.x+r.hh/20/2,r.y+r.hh-r.hh/20-r.hh/20,r.ww-r.hh/20,r.hh/20)
		rect(r.x,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x+r.ww-r.hh/20,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x+r.hh/20+(r.ww-r.hh/20*4)/3,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x+r.hh/20*2+(r.ww-r.hh/20*4)*2/3,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x,r.y+r.hh-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.fenceStyle==2){
		rect(r.x,r.y+r.hh-r.hh/20*5,r.hh/20/2,r.hh/20*5)
		rect(r.x+r.ww-r.hh/20/2,r.y+r.hh-r.hh/20*5,r.hh/20/2,r.hh/20*5)
		rect(r.x+r.hh/20+(r.ww-r.hh/20*4)/3,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x+r.hh/20*2+(r.ww-r.hh/20*4)*2/3,r.y+r.hh-r.hh/20*5,r.hh/20,r.hh/20*5)
		rect(r.x+r.hh/20/2,r.y+r.hh-r.hh/20*5,r.ww-r.hh/20,r.hh/20*3)
		rect(r.x,r.y+r.hh-r.hh/20,r.ww,r.hh/20)
	}	
	else if(r.fenceStyle==3){
		rect(r.x,r.y+r.hh-r.hh/20*5,r.ww,r.hh/20*2)
		for(var i=0;i<21;i+=2){
			rect(r.x+r.ww/21*i,r.y+r.hh-r.hh/20*5,r.ww/21,r.hh/20*5)
		}
		rect(r.x,r.y+r.hh-r.hh/20*5,r.ww,r.hh/20)
		rect(r.x,r.y+r.hh-r.hh/20,r.ww,r.hh/20)
	}	
}
function drawDoor(s,x,y,w,h){
		if(colorR==0)//單色、三色、彩色
			fill("white") 		
		else //if(colorR==1)
			fill(colorset[cr][3])
//		else
//			fill(colorset[cr][3])//door
	if(s==0){
		rect(x+w/5/2,y+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2,y+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2,y+w/5/2/2+h/2/3+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2*3+w/2-w/5/2-w/5/2,y+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2*3+w/2-w/5/2-w/5/2,y+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2*3+w/2-w/5/2-w/5/2,y+w/5/2/2+h/2/3+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		line(x+w/2,y,x+w/2,y+h)
	}
	else if(s==1){
		rect(x,y,w,h/2/3+w/5/2/2+w/5/2/2)
		rect(x+w/5/2,y+w/5/2/2,w-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2,y+w/5/2/2+h/2/3+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		rect(x+w/5/2*3+w/2-w/5/2-w/5/2,y+w/5/2/2+h/2/3+w/5/2/2+h/2/3+w/5/2/2,w/2-w/5/2-w/5/2,h/2/3)	
		line(x+w/2,y+w/5/2/2+w/5/2/2+h/2/3,x+w/2,y+h)
	}
	else if(s==2){
		rect(x+w/5/2,y+w/5/2,w/2-w/5/2-w/5/2,h/2)	
		rect(x+w/2+w/5/2,y+w/5/2,w/2-w/5/2-w/5/2,h/2)	
		line(x+w/2,y,x+w/2,y+h)
	}
	else if(s==3){
		rect(x+w/5/2,y+w/5/2,w*2/3-w/5/2-w/5/2,h/2)	
		rect(x+w-w/5/2-(w*1/3-w/5/2-w/5/2),y+w/5/2,w*1/3-w/5/2-w/5/2,h/2)	
		line(x+w*2/3,y,x+w*2/3,y+h)
	}
	else if(s==4){
		rect(x+w/5/2,y+w/5/2,w-w/5/2-w/5/2,h/4)	
		rect(x+w/5/2,y+w/5/2+h/4+w/5/2,w-w/5/2-w/5/2,h/4)	
		rect(x+w/5/2,y+w/5/2+h/4+w/5/2+h/4+w/5/2,w-w/5/2-w/5/2,h/4)	
	}
	else if(s==5){
		rect(x+w/5/2,y+w/5/2,w-w/5/2-w/5/2,h/3)	
		rect(x+w/5/2,y+h/2+w/5/2,w-w/5/2-w/5/2,h/3)	
	}
}
function drawWindow(s,d,x,y,w,h){
//	stroke("green")
	var windowC="white"	//colorset[cr][3] 
	if(second()>=59-d||second()<d/2)
		windowC="darkgrey"
	
	fill(windowC)
	if(s==0){
		rect(x,y,w,h)
		rect(x,y,w,h/3)
		for(var j=0;j<6;j++){
			arc(x+w/2,y+h/3,w,h/3*2,PI+PI/6*j,PI+PI/6+PI/6*j,PIE)
		}
		for(var j=0;j<10;j++){
			rect(x,y+h/3+j*h*2/3/10,w,h*2/3/10)
		}
	}
	else if(s==1){
		rect(x,y,w,h)
		for(var i=0;i<4;i++){
			triangle(x+w/4*i,y,x+w/4*i+w/4,y,x+w/4*i+w/4/2,y+h/2)	
			triangle(x+w/4*i,y+h,x+w/4*i+w/4,y+h,x+w/4*i+w/4/2,y+h/2)	
			ellipse(x+w/4*i+w/4/2,y+h/2,w/2/2/4)
		}
	}
	else if(s==2){
		rect(x,y,w,h)
		for(var i=0;i<3;i++){
			for(var j=0;j<10;j++){
				rect(x+j*w/10,y+i*h/3,w/10,h/3)
			}
		}
	}
	else if(s==3){
		rect(x,y,w,h)
		var amountX=2
		var amountY=3
		for(var i=0;i<amountY;i++){
			for(var j=0;j<amountX;j++){
				rect(x+j*w/amountX,y+i*h/amountY,w/amountX,h/amountY)
				quad(x+j*w/amountX,y+i*h/amountY,x+j*w/amountX+w/amountX/3,y+i*h/amountY+h/amountY/3,x+j*w/amountX+w/amountX/3+w/amountX/3,y+i*h/amountY+h/amountY/3,x+j*w/amountX+w/amountX,y+i*h/amountY)
				rect(x+j*w/amountX+w/amountX/3,y+i*h/amountY+h/amountY/3,w/amountX/3,h/amountY/3)
				quad(x+j*w/amountX,y+i*h/amountY+h/amountY,x+j*w/amountX+w/amountX/3,y+i*h/amountY+h/amountY-h/amountY/3,x+j*w/amountX+w/amountX/3+w/amountX/3,y+i*h/amountY+h/amountY-h/amountY/3,x+j*w/amountX+w/amountX,y+i*h/amountY+h/amountY)
			}
		}
	}
	else if(s==4){
		rect(x,y,w,h)
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				rect(x+j*w/4,y+i*h/4,w/4,h/4)
				if(i%2==0){
					if(j%2==0){
						noFill()
						arc(x+j*w/4,y+i*h/4+h/4,w/2,h/2,PI*3/2,0)
						arc(x+j*w/4+w/4,y+i*h/4,w/2,h/2,PI/2,PI)
						fill(windowC)
						line(x+j*w/4,y+i*h/4,x+j*w/4+w/4,y+i*h/4+h/4)
					}
					else{
						noFill()
						arc(x+j*w/4+w/4,y+i*h/4+h/4,w/2,h/2,PI,PI*3/2)
						arc(x+j*w/4,y+i*h/4,w/2,h/2,0,PI/2)
						fill(windowC)
						line(x+j*w/4,y+i*h/4+h/4,x+j*w/4+w/4,y+i*h/4)
					}
				}
				else{
					if(j%2!=0){
						noFill()
						arc(x+j*w/4,y+i*h/4+h/4,w/2,h/2,PI*3/2,0)
						arc(x+j*w/4+w/4,y+i*h/4,w/2,h/2,PI/2,PI)
						fill(windowC)
						line(x+j*w/4,y+i*h/4,x+j*w/4+w/4,y+i*h/4+h/4)
					}
					else{
						noFill()
						arc(x+j*w/4+w/4,y+i*h/4+h/4,w/2,h/2,PI,PI*3/2)
						arc(x+j*w/4,y+i*h/4,w/2,h/2,0,PI/2)
						fill(windowC)
						line(x+j*w/4,y+i*h/4+h/4,x+j*w/4+w/4,y+i*h/4)					
					}
				}
			}
		}
	}
	else if(s==5){
		rect(x,y,w,h)
		for(var i=0;i<4;i++){
			for(var j=0;j<2;j++){
				rect(x+j*w/2,y+i*h/4,w/2,h/4)
				rect(x+j*w/2,y+i*h/4,w/2/2,h/4/2)
				rect(x+j*w/2,y+i*h/4+h/4/2,w/2/2,h/4/2)
				rect(x+j*w/2+w/2/2,y+i*h/4+h/4/2,w/2/2,h/4/2)
				rect(x+j*w/2+w/2/2,y+i*h/4,w/2/2,h/4/2)
				ellipse(x+j*w/2+w/2/2,y+i*h/4+h/4/2,w/2/2)
			}
		}
	}
	else if(s==6){
		rect(x,y,w,h)
		for(var i=0;i<4;i++){
			for(var j=0;j<2;j++){
				rect(x+j*w/2,y+i*h/4,w/2,h/4)
				noFill()
				arc(x+j*w/2+w/2/2/2,y+i*h/4+h/4/2,w/2/2,w/2/2,0,PI)
				arc(x+j*w/2+w/2/2,y+i*h/4+w/2/2/2,w/2/2,w/2/2,PI/2,PI*3/2)
				arc(x+j*w/2+w/2-w/2/2/2,y+i*h/4+h/4/2,w/2/2,w/2/2,PI,0)
				arc(x+j*w/2+w/2/2,y+i*h/4+h/4-w/2/2/2,w/2/2,w/2/2,PI*3/2,PI/2)
				fill(windowC)
			}
		}
	}
	else if(s==7){
		rect(x,y,w,h)
		for(var i=0;i<2;i++){
				rect(x+i*w/2,y,w/2*(2/3),h)
				rect(x+i*w/2+w/2*(2/3),y,w/2*(1/3),h)
				ellipse(x+i*w/2+w/2*(2/3)/2,y+w/2*(2/3)/2+h/8,w/2*(2/3))
				ellipse(x+i*w/2+w/2*(2/3)/2,y+h/2,w/2*(2/3))
				ellipse(x+i*w/2+w/2*(2/3)/2,y+h-w/2*(2/3)/2-h/8,w/2*(2/3))
				ellipse(x+i*w/2+w/2*(2/3)+w/2*(1/3)/2,y+h/8+w/2*(2/3),w/2*(1/3))
				ellipse(x+i*w/2+w/2*(2/3)+w/2*(1/3)/2,y+h-h/8-w/2*(2/3),w/2*(1/3))
		}
	}
	else if(s==8){
		rect(x,y,w,h)
		var amountX=2
		var amountY=3
		for(var i=0;i<amountY;i++){
			for(var j=0;j<amountX;j++){
				rect(x+j*w/amountX,y+i*h/amountY,w/amountX,h/amountY)
				quad(x+j*w/amountX+w/amountX/2,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2-w/amountX/2/3,y+i*h/amountY+h/amountY/2-w/amountX/2/3,x+j*w/amountX+w/amountX/2,y+i*h/amountY,x+j*w/amountX+w/amountX/2+w/amountX/2/3,y+i*h/amountY+h/amountY/2-w/amountX/2/3)
				quad(x+j*w/amountX+w/amountX/2,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2-w/amountX/2/3,y+i*h/amountY+h/amountY/2+w/amountX/2/3,x+j*w/amountX+w/amountX/2,y+h/amountY+i*h/amountY,x+j*w/amountX+w/amountX/2+w/amountX/2/3,y+i*h/amountY+h/amountY/2+w/amountX/2/3)
				quad(x+j*w/amountX+w/amountX/2,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2-w/amountX/2/3,y+i*h/amountY+h/amountY/2-w/amountX/2/3,x+j*w/amountX,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2-w/amountX/2/3,y+i*h/amountY+h/amountY/2+w/amountX/2/3,)
				quad(x+j*w/amountX+w/amountX/2,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2+w/amountX/2/3,y+i*h/amountY+h/amountY/2-w/amountX/2/3,x+j*w/amountX+w/amountX,y+i*h/amountY+h/amountY/2,x+j*w/amountX+w/amountX/2+w/amountX/2/3,y+i*h/amountY+h/amountY/2+w/amountX/2/3,)
				line(x+j*w/amountX+w/amountX/2,y,x+j*w/amountX+w/amountX/2,y+h)
				line(x,y+i*h/amountY+h/amountY/2,x+w,y+i*h/amountY+h/amountY/2)
			}
		}
	}
//	stroke("black")	
}

function keyPressed() {
  if (keyCode === 83) {
		saveCanvas("123","png")
	}
}
