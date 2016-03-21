
var canvas = document.getElementById('canvas');
canvas.width  = 1700;
canvas.height = 1000;
//image.src = 'image/ball3.svg';
//image.onload = function (e) {
 // context.drawImage(image, 800, 0, 800, 800,  canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400/ 2, 400, 400); //chage first 800 to rotate img
//};
var footBall = new ImageDrawer('image/ball3.svg', 0, 0, 800, 800, canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400 / 2, 400, 400);
footBall.draw(footBall, canvas);
var footBall2 = new ImageDrawer('image/ball3.svg', 800, 0, 800, 800, canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400 / 2, 400, 400);
setInterval(function(){
  footBall.clearRet(footBall, canvas);
  footBall2.draw(footBall2, canvas);
}, 3000);

var context = canvas.getContext('2d');
var ball = new BallSprite([0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]);
footBall2.animate(footBall2,context,[ball.rotate90]);