/*
  LICENCE:
    The font "Bellefair-Regular.ttf" ( https://github.com/shinntype/bellefair ) is
    licensed under the SIL Open Font License, Version 1.1 ( http://scripts.sil.org/OFL ).
*/

"use strict";

//
// ------------ Array loop utility -------------------------------------
//
function loopArray(array, callback) {
    for (let i = array.length - 1; i >= 0; i -= 1) {
        callback(array[i], i, array);
    }
}

//
// ------------ Array wrapper -----------------------------
//
/// <reference path="ArrayLoopUtility.ts" />
class ArrayWrapper {
    constructor() {
        this.array = [];
    }
    get length() {
        return this.array.length;
    }
    get(index) {
        return this.array[index];
    }
    push(element) {
        this.array.push(element);
    }
    pop() {
        return this.array.pop();
    }
    loop(callback) {
        loopArray(this.array, callback);
    }
}

//
// ------------ Steppable -----------------------------
//
/// <reference path="ArrayWrapper.ts" />
class SteppableArray extends ArrayWrapper {
    static stepFunction(value) {
        value.step();
    }
    step() {
        this.loop(SteppableArray.stepFunction);
    }
}

//
// ------------ Drawable -----------------------------
//
/// <reference path="ArrayWrapper.ts" />
class DrawableArray extends ArrayWrapper {
    static drawFunction(value) {
        value.draw();
    }
    draw() {
        this.loop(DrawableArray.drawFunction);
    }
}

//
// ------------ Sprite -------------------------------------
//
/// <reference path="ArrayWrapper.ts" />
/// <reference path="Steppable.ts" />
/// <reference path="Drawable.ts" />
class SpriteArray extends ArrayWrapper {
    constructor() {
        super(...arguments);
        this.draw = DrawableArray.prototype.draw;
        this.step = SteppableArray.prototype.step;
    }
}

//
// ------------ Rorschach shape ------------------------------
//
/// <reference path="../../../my_types/p5/p5.global-mode.d.ts" />
/// <reference path="Sprite.ts" />
class RorschachShape {
    constructor(params) {
        this.shapeSize = params.shapeSize;
        this.noiseMagnitudeFactor = params.noiseMagnitudeFactor;
        this.centerPosition = createVector();
        this.rotationAngle = 10;
        this.vertexCount = params.vertexCount || Math.floor(0.75 * params.shapeSize);
        this.noiseDistanceScale = params.noiseDistanceScale || params.shapeSize / 320;
        this.noiseTimeScale = params.noiseTimeScale || 0.005;
        this.xNoiseParameterOffset
            = createVector(Math.random(), Math.random()).mult(1240);
        this.yNoiseParameterOffset
            = createVector(Math.random(), Math.random()).mult(1240);
        this.noiseTime = 10;
        this.reachedEndOfScreen = false;
        if (RorschachShape.isNotInitialized)
            RorschachShape.initializeStatic();
    }
    static initializeStatic() {
        this.temporalVector = createVector();
        this.isNotInitialized = false;
    }
    step() {
        this.noiseTime += this.noiseTimeScale;
    }
    draw() {
        if (this.reachedEndOfScreen)
            return;
        translate(this.centerPosition.x, this.centerPosition.y);
        rotate(this.rotationAngle);
        this.drawVertices(+1);
        this.drawVertices(-1);
        rotate(-this.rotationAngle);
        translate(-this.centerPosition.x, -this.centerPosition.y);
    }
    drawVertices(yScaleFactor) {
        const noiseMagnitude = this.noiseMagnitudeFactor * 0.5 * this.shapeSize;
        beginShape();
        let currentBasePositionX = -0.5 * this.shapeSize;
        const basePositionIntervalDistance = this.shapeSize / this.vertexCount;
        const progressRatio = frameCounter.getProgressRatio();
        for (let i = 0; i < this.vertexCount; i += 1) {
            const distanceFactor = progressRatio * sq(sin((i / this.vertexCount) * PI));
            const noiseX = (2 * noise(this.xNoiseParameterOffset.x + this.noiseDistanceScale * currentBasePositionX, 
																			this.xNoiseParameterOffset.y + this.noiseTime) - 1) * noiseMagnitude;
            const noiseY = (2 * noise(this.yNoiseParameterOffset.x + this.noiseDistanceScale * currentBasePositionX, 
																			this.yNoiseParameterOffset.y + this.noiseTime) - 1) * noiseMagnitude;
            const vertexPositionX = currentBasePositionX + distanceFactor * noiseX;
            const vertexPositionY = yScaleFactor * distanceFactor * (0.3 * this.shapeSize + noiseY);
            vertex(vertexPositionX, vertexPositionY);
            const rotatedVertexPosition = RorschachShape.temporalVector;
            rotatedVertexPosition.set(vertexPositionX, vertexPositionY);
					  count += 1;
					  //stroke(frameCount, 255, 255, .1);
            rotatedVertexPosition.rotate(this.rotationAngle);
            this.checkScreen(this.centerPosition.x + rotatedVertexPosition.x, 
														 this.centerPosition.y + rotatedVertexPosition.y);
            currentBasePositionX += basePositionIntervalDistance;
        }
        endShape();
    }
    checkScreen(absolutePositionX, absolutePositionY) {
        const xMargin = 0.01 * width;
        const yMargin = 0.05 * height;
        if (absolutePositionX < xMargin || absolutePositionX > width - xMargin ||
            absolutePositionY < yMargin || absolutePositionY > height - yMargin) {
            this.reachedEndOfScreen = true;
        }
    }
}
RorschachShape.isNotInitialized = true;
//
// --------- ShapeColor (Composite of fill & stroke) -------------
//
class AbstractShapeColor {
    static createAlphaColorArray(c) {
        const array = [];
        for (let alphaValue = 0; alphaValue <= 255; alphaValue += 1) {
            array.push(color(red(c), green(c), blue(c), alpha(c) * alphaValue / 255));
        }
        return array;
    }
}
class ShapeColor extends AbstractShapeColor {
    constructor(strokeColor, fillColor) {
        super();
        this.strokeColorArray = AbstractShapeColor.createAlphaColorArray(strokeColor);
        this.fillColorArray = AbstractShapeColor.createAlphaColorArray(fillColor);
    }
    apply(alphaValue = 255) {
        const index = Math.floor(constrain(alphaValue, 0, 255));
        stroke(this.strokeColorArray[index]);
        //fill(this.fillColorArray[index]);
			  fill(255, 255, 255);
    }
}
class NoStrokeShapeColor extends AbstractShapeColor {
    constructor(fillColor) {
        super();
        this.fillColorArray = AbstractShapeColor.createAlphaColorArray(fillColor);
    }
    apply(alphaValue = 255) {
        noStroke();
        const index = Math.floor(constrain(alphaValue, 0, 255));
        fill(this.fillColorArray[index]);
			
    }
}
class NoFillShapeColor extends AbstractShapeColor {
    constructor(strokeColor) {
        super();
        this.strokeColorArray = AbstractShapeColor.createAlphaColorArray(strokeColor);
    }
    apply(alphaValue = 255) {
        const index = Math.floor(constrain(alphaValue, 0, 255));
        //stroke(this.strokeColorArray[index]);
		    //stroke(random(360), 255, 255, .1);
			  //stroke(10*this.rotationAngle, 255, 255, .1);
			  //stroke(0, 255, 255, .1);
			  //stroke(320, 255, 255, .1);
			  stroke(frameCount/2%360, 255, 255, .1);
        noFill();
    }
}

class NullShapeColor extends AbstractShapeColor {
    apply() { }
}

//
// ------------ Frame counter -----------------------------
//
class FrameCounter {
    constructor() {
        if (FrameCounter.isNotInitialized)
            console.log('FrameCounter is not initialized.');
        this.count = 0;
    }
    static initializeStatic(frameRate) {
        this.frameRate = frameRate;
        this.isNotInitialized = false;
    }
    resetCount(count = 0) {
        this.count = count;
    }
    step() {
        this.count += 1;
    }
    mod(divisor) {
        return this.count % divisor;
    }
    /**
     * Returns ratio from 0 to 1 according to current frame count and given frequency per second.
     * @param frequency {number} - frequency per second
     */
    getCycleProgressRatio(frequency) {
        return ((frequency * this.count) % FrameCounter.frameRate) / FrameCounter.frameRate;
    }
    /**
     * Returns sine value (from 0 to 1)according to
     * current frame count and given frequency per second.
     * @param frequency {number} - frequency per second
     */
    sin(frequency = 1) {
        return Math.sin(this.getCycleProgressRatio(frequency) * TWO_PI);
    }
}
FrameCounter.isNotInitialized = true;
class TimedFrameCounter extends FrameCounter {
    constructor(on, duration = 0, completeBehavior = () => { }) {
        super();
        this.isOn = on;
        this.isCompleted = false;
        this.completeBehavior = completeBehavior;
        this.durationFrameCount = duration;
    }
    on(duration) {
        this.isOn = true;
        if (duration)
            this.durationFrameCount = duration;
    }
    off() {
        this.isOn = false;
    }
    step() {
        if (!this.isOn)
            return;
        this.count += 1;
        if (this.count > this.durationFrameCount) {
            this.isCompleted = true;
            this.isOn = false;
            this.completeBehavior();
        }
    }
    getProgressRatio() {
        if (this.durationFrameCount)
            return constrain(this.count / this.durationFrameCount, 0, 1);
        else
            return 0;
    }
}
//
// ---------- Signature function --------------------------------------------
//
/// <reference path="../../../my_types/p5/p5.global-mode.d.ts" />
/// <reference path="ShapeColor.ts" />
function createSignFunction(xMargin, yMargin, textSize, textColor, textBackgroundColor, titleText) {
    const textAreaWidth = xMargin;
    const textAreaHeight = yMargin + textSize * 1.1;
    const leftX = width - textAreaWidth;
    const topY = height - textAreaHeight;
    const baseLineY = height - yMargin;
    const getTitleText = (typeof titleText === 'string') ? () => { return titleText; } : titleText;
    return () => {
        textBackgroundColor.apply();
        rect(leftX, topY, textAreaWidth, textAreaHeight);
        textColor.apply();
        text(getTitleText(), leftX, baseLineY);
    };
}

/// <reference path="common/RorschachShape.ts" />
/// <reference path="common/ShapeColor.ts" />
/// <reference path="common/Sprite.ts" />
/// <reference path="common/FrameCounter.ts" />
/// <reference path="common/SignatureFunction.ts" />
//
// ------------ Global variables ------------------------------
//
p5.disableFriendlyErrors = true;
const IDEAL_FRAME_RATE = 120;
let unitLength;
let unitSpeed;
let count;
const fontPath = 'Bellefair-Regular.ttf';
let currentFont;
let currentFontSize;
let backgroundColor;
let frameCounter;
let rorschachShape;
let rorschachShapeColor;
let sign;
function getCurrentISODate() {
    const dateTime = new Date().toISOString();
    return dateTime.substring(0, dateTime.indexOf('T'));
}
//
// ------------ Setup & Draw etc. ---------------------------------------
//

function preload() {
    currentFont = loadFont(fontPath);
}

function setup() {
    const canvasSideLength = Math.min(1112, 834);
    createCanvas(4/3*canvasSideLength, canvasSideLength);
	  colorMode(HSB,360, 255, 255);
    frameRate(IDEAL_FRAME_RATE);
    unitLength = Math.min(width, height) / 640;
    unitSpeed = unitLength / IDEAL_FRAME_RATE;
    strokeWeight(Math.max(1, 1 * unitLength));
    FrameCounter.initializeStatic(IDEAL_FRAME_RATE);
    backgroundColor = color(252);
    frameCounter = new TimedFrameCounter(true, 13 * IDEAL_FRAME_RATE, () => { noLoop(); });
    currentFontSize = 14 * unitLength;
    textFont(currentFont, currentFontSize);
    sign = createSignFunction(200 * unitLength, 20 * unitLength, currentFontSize, new NoStrokeShapeColor(color(0)), 
															new NoStrokeShapeColor(backgroundColor), () => { return 'Rorschach ' + getCurrentISODate() + '  -  FAL'; });
    initialize();
}

function draw() {
		translate(88,0);
	  scale(1.2, 1);
    rorschachShape.step();
    rorschachShapeColor.apply();
	  //fill(255, 255, 255, 20);
    rorschachShape.draw();
    //sign();
    frameCounter.step();
}

function initialize() {
    background(backgroundColor);
    const rorschachShapeSize = 480 * unitLength;
    rorschachShape = new RorschachShape({
        shapeSize: rorschachShapeSize,
        vertexCount: Math.floor(1.5 * rorschachShapeSize),
        noiseDistanceScale: random(0.005, 0.04),
        noiseMagnitudeFactor: random(1, 4),
        noiseTimeScale: 0.0005,
    });
    rorschachShape.centerPosition.set(0.354 * width, 0.48 * height);
    rorschachShape.rotationAngle = PI + HALF_PI;
    rorschachShapeColor = new NoFillShapeColor(color(0, random(8, 48)));
    frameCounter.resetCount();
    frameCounter.on();
    loop();
}

// save jpg
let lapse = 0;    // mouse timer
function mousePressed(){
  if (millis() - lapse > 400){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
    lapse = millis();
  } 
}
