var canvas;
var canvasContext;
var framesPS = 30;

var ballX = 75;
var ballSpeedX = 5;
var ballY = 75;
var ballSpeedY = 7;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_EDGE = 60;
var paddleX = 400;

var mouseX;
var mouseY;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const BRICK_GAP = 2;
var brickGrid= new Array(BRICK_COLS * BRICK_ROWS);


window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setInterval(updateAll, 1000/framesPS);

  canvas.addEventListener('mousemove',updateMousePos);

  brickReset();
}
function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}


function updateAll(){
  moveAll();
  drawAll();
}
function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = 5;
  ballSpeedY = 7;
}

function moveAll(argument) {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.width){
    ballSpeedX *= -1;
  }
  if(ballX < 0){
    ballSpeedX *= -1;
  }

  if(ballY > canvas.height){
    //ballSpeedY *= -1;
    ballReset();
  }
  if(ballY < 0){
    ballSpeedY *= -1;
  }

  var ballBrickCol = Math.floor(ballX / BRICK_W);
  var ballBrickRow = Math.floor(ballY / BRICK_H);
  var brickIndex = rowColToArrayIndex(ballBrickCol,ballBrickRow)

  if(ballBrickCol >=0 && ballBrickCol < BRICK_COLS &&
     ballBrickRow >=0 && ballBrickRow < BRICK_ROWS){
       if(brickGrid[brickIndex]){
         brickGrid[brickIndex] = false;
         ballSpeedY *= -1;
       }
  }

  var paddleTopEdgeY = canvas.height - PADDLE_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

  if(ballY > paddleTopEdgeY && ballY < paddleBottomEdgeY &&
     ballY > paddleLeftEdgeX && ballX < paddleRightEdgeX){
       ballSpeedY *= -1;

       var centerOFPaddleX = paddleX+ PADDLE_WIDTH/2;
       var ballDistX = ballX - centerOFPaddleX;
       ballSpeedX = ballDistX * 0.35;
  }

}
function drawAll(argument) {
  drawRect(0,0, canvas.width, canvas.height,'black');
  drawCircle(ballX,ballY,10,'white');
  drawRect(paddleX, canvas.height - PADDLE_EDGE, PADDLE_WIDTH,PADDLE_THICKNESS, 'white');

  drawBricks();
}

function brickReset() {
  for(var i = 0; i < BRICK_COLS * BRICK_ROWS; i++){
      brickGrid[i] = true;
  }
}

function rowColToArrayIndex(col,row) {
  return BRICK_COLS * row + col
}

function drawBricks() {

  for(var eachRow=0;eachRow < BRICK_ROWS; eachRow++){
    for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){

      var arrayIndex = rowColToArrayIndex(eachCol,eachRow);

      if(brickGrid[arrayIndex]){
        drawRect(BRICK_W*eachCol,BRICK_H*eachRow, BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP,'blue');
      }

    }
  }

}

function drawRect(x,y,width,height,color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height);
}
function drawCircle(x,y,rad,color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x,y,rad,0, Math.PI*2, true);
  canvasContext.fill();
}

function drawText(w,x,y, color) {
  canvasContext.fillStyle= color;
  canvasContext.fillText(w,x,y);
}
