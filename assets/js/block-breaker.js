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

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setInterval(updateAll, 1000/framesPS);

  canvas.addEventListener('mousemove',updateMousePos);
}
function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  //var mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH/2;
}


function updateAll(){
  moveAll();
  drowAll();
}
function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
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
function drowAll(argument) {
  drowRect(0,0, canvas.width, canvas.height,'black');
  drowCircle(ballX,ballY,10,'white');
  drowRect(paddleX, canvas.height - PADDLE_EDGE, PADDLE_WIDTH,PADDLE_THICKNESS, 'white');

}
function drowRect(x,y,width,height,color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height);
}
function drowCircle(x,y,rad,color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x,y,rad,0, Math.PI*2, true);
  canvasContext.fill();
}
