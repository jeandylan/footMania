/**
 * Created by dylan on 20-Mar-16.
 */
var xS = document.getElementById('xS');
var xE = document.getElementById('xE');
var y = document.getElementById('y');
var pos = document.getElementById('pos');
var mouseDownPos = [];
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  xS.innerHTML = 'start at X:' + loc.x + ' Y:' + loc.y;
  mouseDownPos.push(loc);
};

canvas.onmouseup = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  var initMouseDown = mouseDownPos.pop();
  if (loc.y === initMouseDown.y) {
    pos.innerHTML('staright line');
  }
  xE.innerHTML = 'end at loc ' + loc.x + 'Y:' +  loc.y;
};

