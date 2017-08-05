var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');

mainCanvas.height = window.innerHeight;
mainCanvas.width = window.innerWidth;

var color = ["blue", "yellow", "red"];

var bubbles = [];

var targetColor = new TargetColor();
var score, point, lvl, sizeBubble, speedBubble;

var timePopBubble, timePopTarget;

function Circle(size, speedY, posX, posY, color) {
    this.size = size;
    this.speedY = speedY;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
}

Circle.prototype.update = function () {
    mainContext.beginPath();
    mainContext.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
    mainContext.closePath();
    mainContext.fillStyle = this.color;
    mainContext.fill();

    /* Animate */
    this.posY -= this.speedY;

    // Delete bubbles when they're out window
    if (this.posY < -this.size && this.color !== targetColor.color) {
        this.delete();
    } else if (this.posY < -this.size && this.color === targetColor.color) {
        //console.log("lose");
    }
};

Circle.prototype.detect = function (eventX, eventY) {
    var rect = mainCanvas.getBoundingClientRect();
    var x = eventX - rect.left;
    var y = eventY - rect.top;

    if (y >= this.posY - this.size &&
        y <= this.posY + this.size &&
        x >= this.posX - this.size &&
        x <= this.posX + this.size) {
        if (this.color === targetColor.color) {
            this.delete();
            updateScore();
        } else if (this.color !== targetColor.color) {
            console.log("lose");
        }
    }
};

Circle.prototype.delete = function () {
    var index = bubbles.indexOf(this);
    if (index > -1) {
        bubbles.splice(index, 1);
    }
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height - targetColor.height);
};

function TargetColor() {
    this.width = mainCanvas.width;
    this.height = 40;
    this.posX = 0;
    this.posY = mainCanvas.height - this.height;
    this.color = null;
}

TargetColor.prototype.update = function () {
    var randomColor = color[randomInt(0, color.length)];
    this.color = randomColor;
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainContext.beginPath();
    mainContext.rect(this.posX, this.posY, this.width, this.height);
    mainContext.fillStyle = randomColor;
    mainContext.fill();

};

mainCanvas.addEventListener('click', function (event) {
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height - targetColor.height);
    for (var i = 0; i < bubbles.length; i++) {
        var myCircle = bubbles[i];
        myCircle.detect(event.pageX, event.pageY);
    }
}, false);

function drawbubbles() {
    var posX = (Math.random() * (mainCanvas.width - sizeBubble));
    var posY = mainCanvas.height - (targetColor.height - sizeBubble);
    var randomColor = color[randomInt(0, color.length)];
    var circle = new Circle(sizeBubble, speedBubble, posX, posY, randomColor);
    bubbles.push(circle);
}

function animatebubbles() {
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height - targetColor.height);
    for (var i = 0; i < bubbles.length; i++) {
        var myCircle = bubbles[i];
        myCircle.update();
    }
    mainContext.fillStyle = "#000";
    mainContext.font = "24px Arial";
    mainContext.fillText(score + " points", 50, 50);
    requestAnimationFrame(animatebubbles);
}


function draw() {
    setInterval(function(){
        drawbubbles();
    }, timePopBubble);
    animatebubbles();
    targetColor.update();
    setInterval(function () {
        targetColor.update();
    }, timePopTarget);
}

function updateScore() {
    score += point;
    checkScore(score);
}

function init() {
    score = 0;
    point = 1;
    lvl = 1;
    chooseLevel(lvl);
    draw();
}

function randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function chooseLevel(lvl) {
    switch (lvl) {

        case 1:
            sizeBubble = 50;
            point = 1;
            speedBubble = 1;
            timePopTarget = 10000;
            timePopBubble = 1000;
            break;
        case 2:
            sizeBubble = 50;
            point = 2;
            speedBubble = 2;
            color.push("green", "black");
            break;
        case 3:
            sizeBubble = 50;
            point = 3;
            speedBubble = 3;
            color.push("brown", "plum", "grey");
            break;
        case 4:
            sizeBubble = 40;
            point = 4;
            speedBubble = 1200;
            color.push("bisque", "lightgreen", "skyblue");
            break;
        case 5:
            sizeBubble = 30;
            point = 5;
            speedBubble = 1000;
            color.push("steelblue", "pink");
            break;
        case 6:
            sizeBubble = 20;
            point = 6;
            speedBubble = 1200;
            break;

    }
}

function checkScore(score) {
    switch (score) {

        case 5:
            chooseLevel(2);
            break;
        case 20:
            chooseLevel(3);
            break;
        case 50:
            chooseLevel(4);
            break;
        case 80:
            chooseLevel(5);
            break;
        case 100:
            chooseLevel(6);
            break;
    }
}

init();