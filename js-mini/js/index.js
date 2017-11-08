"use strict";
var colorMap = [
    '#1abc9c',
    '#3498db',
    '#9b59b6'
];
var colorMap2 = [
    '#ffffff',
    '#ebebeb',
    '#dfd3d3'
];
// var img; 
//     function setup(){
//     img = loadImage("cat1.png"); 
//     }
//     function draw() {
//   // Displays the image at its actual size at point (0,0)
//   image(img, 0, 0);
//   // Displays the image at point (0, height/2) at half size
//   // image(img, 0, height/2, img.width/2, img.height/2);
// }

var Mover = (function () {
    //     function setup(){
    // img = loadImage("assets/cat1.png"); 
    // }
    
    function Mover(position, velocity, acceleration) {
        if (position === void 0) { position = createVector(0, 0); }
        if (velocity === void 0) { velocity = createVector(0, 0); }
        if (acceleration === void 0) { acceleration = createVector(0, 0); }
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.color = color(random(colorMap));
        this.color2 = color(random(colorMap2));
        this.maxSpeed = 2;
    }
    Mover.prototype.update = function () {
        var mouse = createVector(mouseX, mouseY);
        this.acceleration = p5.Vector.sub(mouse, this.position);
        this.acceleration.setMag(0.2);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        var vd = p5.Vector.sub(mouse, this.position);
        this.rotation = atan2(vd.y, vd.x);
    };
    Mover.prototype.draw = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation);
        noStroke();
          // image(img, 0, 0);
          // image(img, 0, height/2, img.width/2, img.height/2);
        fill(this.color2);
        ellipse(0, 0, 40, 40);
        fill(this.color);
        ellipse(0, -10, 20, 20);
        fill(0,0,0);
        ellipse(0, -10, 10, 10);
        pop();
    };
    return Mover;
}());
var movers = [];
function setup() {
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    createCanvas(innerWidth, innerHeight);
    for (var i = 0; i < 10; i += 1) {
        movers.push(new Mover(new p5.Vector(random(0, width), random(0, height))));
    }
}
function draw() {
    background(33);
    movers.forEach(function (mover) {
        mover.update();
        mover.draw();
    });
}
function windowResized() {
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    resizeCanvas(innerWidth, innerHeight);
}