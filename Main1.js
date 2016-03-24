
var canvas = document.getElementById('canvas');
canvas.width  = 1700;
canvas.height = 1000;
var context = canvas.getContext('2d');
var lastAdvance = 0;
//image.src = 'image/ball3.svg';
//image.onload = function (e) {
 // context.drawImage(image, 800, 0, 800, 800,  canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400/ 2, 400, 400); //chage first 800 to rotate img
//};

var painter = new ImageDrawer('ball3.svg', canvas.width / 2 - 400 / 2,  canvas.height / 2 - 400 / 2, 400, 400);
var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);




var PAGEFLIP_INTERVAL=100;
function animate(time) {


    if (time - lastAdvance > PAGEFLIP_INTERVAL) {
      painter.clearRet(painter, context);
      painter.moveDrawer(painter);
      painter.reduceDrawingSize(painter);
      painter.draw(painter, context, ball.getContinuousSpriteFrame());




      lastAdvance = time;
    }
    window.requestNextAnimationFrame(animate);

}
window.requestNextAnimationFrame(animate);


