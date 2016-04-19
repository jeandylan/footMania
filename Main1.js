var canvas=document.getElementById('canvas');
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
var x;
var y;
canvas.width= 1000;
canvas.height=900;
var context=document.getElementById('canvas').getContext('2d');
//draw score board
context.fillStyle = '#F69769';
context.fillRect(0,0,1000,40);
var deg2rad = Math.PI/180;
var move= false;
var tryLeft=10;
var goal=0;
var direction=0;
var rotateBall=false;
var continueAnimation=true;
box2d.init();

var painterBall = new ImageDrawer(canvas.width / 2 - 200 / 2,  800, 100, 100);
var painterGrass=new ImageDrawer(-canvas.width/2,500,1750,1100);
var painterGoalKeeper=new ImageDrawer(400,300,175,200);
//define sprites
var keeperRight=new Sprite([[820,170,275,115]]);
var keeperleft=new Sprite([[828,444,279,120]]);
var keeper90Left=new Sprite([[272,341,280,210]]);
var keeper90Right=new Sprite([[533,75,285,215]]);
var keeperUp=new Sprite([[250,555,300,300]]);
var keeperCenter= new Sprite([[35,57,136,216]]);
var keeperDown= new Sprite([[0,0,300,300],[0,555,300,300]]);
var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);
objectList= [{name:"ball",shape:'circle',density:1,friction:0.3,restitution:0.6, x:painterBall._coorXOnCanvas,y:painterBall._coorYOnCanvas, type:'d',radius:45},
  {name:"goalPostBarTop",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:40,y:200,width:750,height:20, type:'s'},
  {name:"goalPostBarSideLeft",shape:'rectangle',density:1,friction:0.5,restitution:0.6,x:40,y:200,width:20,height:250, type:"s"},
  {name:"goalPostBarSideRight",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:780,y:200,width:20,height:250, type:'s'},
  {name:"goalKeeper",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:300,width:keeperCenter.getWidth(),height:keeperCenter.getHeight(), type:'k'},
  {name:"Goal",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:70,y:230,width:700,height:200, type:'k'}];
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();
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
preloadimages(['ball3.svg','g.png','Grass.jpeg']).done(function(images){
  painterBall._image=images[0];
  painterGoalKeeper._image=images[1];
  painterGrass._image=images[2];
startGame();
});
function startGame(){
  tryLeft--;
  console.log(tryLeft);
  rotateBall=false;
  createPhysicObject(objectList);
  painterGrass.simpleDraw(context);
  painterBall.draw(context, ball.getCurrentImage());
  painterGoalKeeper.draw2(context, keeperCenter.getCurrentImage(), {x: 400, y: 300});
  drawGoalPost();
  continueAnimation=true;
  requestAnimFrame(Animate);
  setTimeout(function(){
      box2d.Impluse('ball',((Math.random() * 80) - 39),Math.floor((Math.random() * -30) - 30));
     box2d.CollisionDetection(displayOutcome);
    rotateBall=true;
  }, 3000);
 //console.log("waiting");
}

$(canvas).mouseup(function(e) {
  posR=windowToCanvas(canvas,e.pageX,e.pageY)
x=posR.x;
y=posR.y;
  var goalKeeper = box2d.getBodyByName('goalKeeper');
  var delX=x-goalKeeper.GetPosition().x*30;
  var delY=y-goalKeeper.GetPosition().y*30;
 var deg=Math.atan2(delX,delY)*57;
  if(deg > 80 || deg < -80) {
    move = true;
      if(deg  < -100 && deg > -140 ){//90 left
     direction=2;
        ///create new bofydef for goalkeeper
        var newGoalKeeperDef=goalKeeper.GetUserData();
        newGoalKeeperDef.angle=-45;
        box2d.world.DestroyBody(goalKeeper);
        Objects.create(newGoalKeeperDef);
      }
    else if (deg > 140) {//up
        direction=3;
      }
    else if (deg < -140) {//up
        direction=3;
      }
    else if(deg < 140 && deg > 100) {//90 right
        direction=4;
        ///create new bofydef for goalkeeper
        var newGoalKeeperDef=goalKeeper.GetUserData();
        newGoalKeeperDef.angle=45;
        box2d.world.DestroyBody(goalKeeper);
        Objects.create(newGoalKeeperDef);
      }
    else if (deg > 80 && deg <100) {//right
      direction=5;
        ///create new bofydef for goalkeeper
        var newGoalKeeperDef=goalKeeper.GetUserData();
       var tempW=newGoalKeeperDef.width;
        var tempH=newGoalKeeperDef.height;
        newGoalKeeperDef.height=tempW;
        newGoalKeeperDef.width=tempH;
        box2d.world.DestroyBody(goalKeeper);
        Objects.create(newGoalKeeperDef);
      }
      else if (deg < -80 && deg >-100) {//left
        direction=1;
        ///create new bofydef for goalkeeper
        var newGoalKeeperDef=goalKeeper.GetUserData();
        var tempW=newGoalKeeperDef.width;
        var tempH=newGoalKeeperDef.height;
        newGoalKeeperDef.height=tempW;
        newGoalKeeperDef.width=tempH;
        box2d.world.DestroyBody(goalKeeper);
        Objects.create(newGoalKeeperDef);
      }
  }
});

function Animate() {
  if (continueAnimation) {
    posBall = box2d.getMapBodyPositionCanvasCircle('ball', 45);
    posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper');
    box2d.world.Step(1 / 60, 8, 3);
    box2d.world.ClearForces();
    box2d.world.DrawDebugData();
    if (rotateBall) {
      ball.loopAllFrames();

    }
    // box2d.drawDebug();
    context.save();
    painterGrass.clipRegionSprite(context, painterBall, posBall);
    painterGrass.simpleDraw(context);
    painterBall.draw3(context, ball.getCurrentImage(), posBall);
    drawGoalPost();
    context.restore();
    if (move) {
      //console.log("true");
      box2d.moveUp(x, y);
      context.save();
      posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeperCenter.getWidth(), keeperleft.getHeight());
      painterGoalKeeper.clipRegionSpriteWH(context, keeperCenter.getWidth(), keeperCenter.getHeight(), posKeeper);
      painterGrass.simpleDraw(context);
      painterBall.draw3(context, ball.getCurrentImage(), posBall);
      drawGoalPost();
      context.restore();
      // console.log(posKeeper.x+","+posKeeper.y);
      switch (direction) {

        case 1:
          context.save();
          posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeperleft.getWidth(), keeperleft.getHeight());
          painterGoalKeeper.clipRegionSpriteWH(context, keeperleft.getWidth(), keeperleft.getHeight(), posKeeper);
          painterGrass.simpleDraw(context);
          drawGoalPost();
          painterGoalKeeper.draw2(context, keeperleft.getCurrentImage(), posKeeper);
          painterBall.draw3(context, ball.getCurrentImage(), posBall);
          context.restore();
          break;
        case 2:
          context.save();
          posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeper90Left.getWidth(), keeper90Left.getHeight());
          painterGoalKeeper.clipRegionSpriteWH(context, keeper90Left.getWidth(), keeper90Left.getHeight(), posKeeper);//add +20 because 45 degree tend to be clip too small
          painterGrass.simpleDraw(context);
          drawGoalPost();
          painterGoalKeeper.draw2(context, keeper90Left.getCurrentImage(), posKeeper);
          painterBall.draw3(context, ball.getCurrentImage(), posBall);
          context.restore();
          break;
        case 3:
          context.save();
          posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeperUp.getWidth(), keeperUp.getHeight());
          painterGoalKeeper.clipRegionSpriteWH(context, keeperUp.getWidth(), keeperUp.getHeight(), posKeeper);
          painterGrass.simpleDraw(context);
          drawGoalPost();
          painterGoalKeeper.draw2(context, keeperUp.getCurrentImage(), posKeeper);
          context.restore();
          break;
        case 4:
          context.save();
          posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeper90Right.getWidth(), keeper90Right.getHeight());
          painterGoalKeeper.clipRegionSpriteWH(context, keeper90Right.getWidth() + 20, keeper90Right.getHeight() + 20, posKeeper); //add +20 because 45 degree tend to be clip too small
          painterGrass.simpleDraw(context);
          drawGoalPost();
          painterGoalKeeper.draw2(context, keeper90Right.getCurrentImage(), posKeeper);
          painterBall.draw3(context, ball.getCurrentImage(), posBall);
          context.restore();
          break;
        case 5:
          context.save();
          posKeeper = box2d.getMapBodyPositionCanvas('goalKeeper', keeperRight.getWidth(), keeperRight.getHeight());
          painterGoalKeeper.clipRegionSpriteWH(context, keeperRight.getWidth(), keeperRight.getHeight() + 100, posKeeper); //some awardness add 20
          painterGrass.simpleDraw(context);
          drawGoalPost();
          painterBall.draw3(context, ball.getCurrentImage(), posBall);
          painterGoalKeeper.draw2(context, keeperRight.getCurrentImage(), posKeeper);

          context.restore();
          break;
        default:
          break;
      }
    }
    if ((posBall.x > canvas.width || posBall.y > canvas.height)) {
      destroyPhysicObject(objectList);
      //because obj goalKepper property was changed we reEstablishIt
      objectList[4] = {
        name: "goalKeeper",
        shape: 'rectangle',
        density: 1,
        friction: 0.5,
        restitution: 0.6,
        x: 400,
        y: 300,
        width: keeperCenter.getWidth(),
        height: keeperCenter.getHeight(),
        type: 'k'
      };
      direction = 0;
      move = false;
      startGame();
      return;
    }
    else {
      requestAnimFrame(Animate);
    }
  }
  else{
    setTimeout(function(){
      destroyPhysicObject(objectList);
      //because obj goalKepper property was changed we reEstablishIt
      objectList[4] = {
        name: "goalKeeper",
        shape: 'rectangle',
        density: 1,
        friction: 0.5,
        restitution: 0.6,
        x: 400,
        y: 300,
        width: keeperCenter.getWidth(),
        height: keeperCenter.getHeight(),
        type: 'k'
      };
      direction = 0;
      move = false;
      startGame();
    }, 2000);
  }
}


function displayOutcome(outcome){
  if (outcome==1) {
    goal++;
    context.font = 'italic 25pt Calibri';
    context.clearRect(0,0,1000,40);
    context.fillStyle = '#F69769';
    context.fillRect(0,0,1000,40);
    context.fillStyle = '#F8F4F8';
    context.fillText('Goal :'+goal, 20, 20);
    context.fillText('left :'+tryLeft, 500, 20);
    continueAnimation=false;

    console.log(goal);
  }
  if (outcome==2){
    context.font = 'italic 25pt Calibri';
    context.clearRect(0,0,1000,40);
    context.fillStyle = '#F69769';
    context.fillRect(0,0,1000,40);
    context.fillStyle = '#F8F4F8';
    context.fillText('Goal :'+goal, 20, 20);
    context.fillText('left :'+tryLeft, 500, 20);
    //context.fillText('Block', 150, 100);
  }
}

function createPhysicObject(objectList){
  for(var i=0; i<objectList.length; i++){
    Objects.create(objectList[i]);
  }
}
function destroyPhysicObject(objectList){
  for(var i=0; i<objectList.length; i++){
    box2d.destroyBody(objectList[i].name);
  }
}
function drawGoalPost(){
  context.strokeStyle="rgba(255, 255, 255, .0)";
  context.fillStyle="#EEF1F6";
  context.fillRect(40,200,750,25);
  context.stroke();
  context.fillStyle="#EEF1F6";
  context.fillRect(40,200,25,250);
  context.stroke();
  context.fillStyle="#EEF1F6";
  context.fillRect(765,200,25,250);
  context.stroke();
}