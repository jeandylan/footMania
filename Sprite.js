
var canvas = document.getElementById('canvas');
canvas.width  = 1700;
canvas.height = 1000;
//image.src = 'image/ball3.svg';
//image.onload = function (e) {
 // context.drawImage(image, 800, 0, 800, 800,  canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400/ 2, 400, 400); //chage first 800 to rotate img
//};
var footBall = new BallSprite('image/ball3.svg', 800, 0, 800, 800, canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400 / 2, 400, 400);
footBall.draw(footBall, canvas);