
var canvas = document.getElementById('canvas');
canvas.width  = 1700;
canvas.height = 1000;
var context = canvas.getContext('2d');
var lastAdvance = 0;
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

var painter = new ImageDrawer('ball3.svg', canvas.width / 2 - 200 / 2,  canvas.height/1.3 - 200 / 2, 200, 200);
var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);

var PAGEFLIP_INTERVAL=100;
function animate(time) {
  if (time - lastAdvance > PAGEFLIP_INTERVAL) {
    painter.clearRet(painter, context);
    ball.getContinuousSpriteFrame();
    painter.draw(painter, context, ball.getCurrentImage());
    lastAdvance = time;

  }
  window.requestNextAnimationFrame(animate);
}
window.requestNextAnimationFrame(animate);

canvas.addEventListener('mouseup', function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  painter.moveDrawerToPoint(painter, loc);
});

canvas.addEventListener('mousedown', function (e) {
 //ball.stopAnimation();
  //painter.draw(painter, context, ball.currentImage);
});
window.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
console.log("tret");
  }
  if (e.keyCode === 65) {
    console.log("");
  }
});

