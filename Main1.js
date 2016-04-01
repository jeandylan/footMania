var ballRotation=true;
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

function preloadimages(arr){
  var newimages=[], loadedimages=0
  var postaction=function(){}
  var arr=(typeof arr!="object")? [arr] : arr
  function imageloadpost(){
    loadedimages++
    if (loadedimages==arr.length){
      postaction(newimages) //call postaction and pass in newimages array as parameter
    }
  }
  for (var i=0; i<arr.length; i++){
    newimages[i]=new Image()
    newimages[i].src=arr[i]
    newimages[i].onload=function(){
      imageloadpost()
    }
    newimages[i].onerror=function(){
      imageloadpost()
    }
  }
  return { //return blank object with done() method
    done:function(f){
      postaction=f || postaction //remember user defined callback functions to be called when images load
    }
  }
}
preloadimages(['ball3.svg','g.png']).done(function(images){
  //call back codes, for example:
  var painterBall = new ImageDrawer(images[0], canvas.width / 2 - 200 / 2,  canvas.height/1.3 - 200 / 2, 200, 200);
  var painterGoalKeeper=new ImageDrawer(images[1],0,0,300,300);
  var keeper=new Sprite([[0,0,300,300]]);
  var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);
  painterBall.clearRet(context);
  painterBall.draw(context, ball.getCurrentImage());
  painterGoalKeeper.draw(context,keeper.getCurrentImage());

var PAGEFLIP_INTERVAL=30;
function animateBall(time) {
  if (ballMovement.continue) {
  if (time - lastAdvance > PAGEFLIP_INTERVAL) {
    painterBall.clearRet(context);
    ball.getContinuousSpriteFrame();
    ballMovement.moveToPath();
    painterBall.draw(context, ball.getCurrentImage());
    lastAdvance = time;
  }
    window.requestNextAnimationFrame(animateBall);
  }
}

canvas.addEventListener('mouseup', function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
 // painterBall.moveDrawerToPoint(painterBall, loc);
  ballMovement= new Tragetory(250,{x:painterBall._coorXOnCanvas, y:painterBall._coorYOnCanvas}, loc, painterBall);
  ballRotation=true;
  window.requestAnimationFrame(function() {
    //ballMovement.moveToPath();
    animateBall(ballMovement);
  });
});
});




