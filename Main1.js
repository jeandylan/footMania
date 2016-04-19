
var canvas=document.getElementById('canvas');
function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
var x;
var y;

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

  canvas.width= 1000;
  canvas.height=900;

  var context=document.getElementById('canvas').getContext('2d');
  //context.translate(canvas.width / 2, canvas.height / 2);
  var painterBall = new ImageDrawer(images[0], canvas.width / 2 - 200 / 2,  700, 100, 100);
  var painterGrass=new ImageDrawer(images[2],-canvas.width/2,50,1750,1100);
  //define sprites
  var keeperRight=new Sprite([[820,170,275,115]]);
  var keeperleft=new Sprite([[828,444,279,120]]);
  var keeper90Left=new Sprite([[272,341,280,210]]);
  var keeper90Right=new Sprite([[533,75,285,215]]);
  var keeperUp=new Sprite([[250,555,300,300]]);
  var keeperCenter= new Sprite([[35,57,136,216]]);
  var keeperDown= new Sprite([[0,0,300,300],[0,555,300,300]]);
  var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);

  objectList= [{name:"ball",shape:'circle',density:1,friction:0.5,restitution:0.6, x:painterBall._coorXOnCanvas,y:painterBall._coorYOnCanvas, type:'d',radius:45},
    {name:"goalPostBarTop",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:40,y:200,width:750,height:20, type:'s'},
    {name:"goalPostBarSideLeft",shape:'rectangle',density:1,friction:0.5,restitution:0.6,x:40,y:200,width:20,height:250, type:"s"},
    {name:"goalPostBarSideRight",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:780,y:200,width:20,height:250, type:'s'},
    {name:"goalKeeper",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:300,width:keeperCenter.getWidth(),height:keeperCenter.getHeight(), type:'k'},
    {name:"Goal",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:200,width:740,height:200, type:'k'}];
  box2d.init();
  Objects.create(objectList[0]);
  Objects.create(objectList[2]);
  Objects.create(objectList[3]);
  Objects.create(objectList[1]);
  Objects.create(objectList[4]);
  //Objects.create(objectList[5]);

  var pos=box2d.getMapBodyPositionCanvasCircle('ball',45);
  var posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper');
  var painterGoalKeeper=new ImageDrawer(images[1],posKeeper.x,posKeeper.y,175,200);

  painterGrass.simpleDraw(context);
  painterBall.draw(context,ball.getCurrentImage());
  painterGoalKeeper.draw2(context,keeperCenter.getCurrentImage(),{x:400,y:300});

drawGoalPost();

  function Animate() {
    pos=box2d.getMapBodyPositionCanvasCircle('ball',45);
    box2d.world.Step(1 / 60, 8, 3);
    box2d.world.ClearForces();
    box2d.world.DrawDebugData();
  //box2d.drawDebug();
    context.save();
    ball.loopAllFrames();
    painterGrass.clipRegionSprite(context,painterBall,pos);
    painterGrass.simpleDraw(context);
    painterBall.draw3(context,ball.getCurrentImage(),pos);
    drawGoalPost();
    context.restore();
    if (move) {
      box2d.moveUp(x,y);
      context.save();
      posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeperCenter.getWidth(),keeperleft.getHeight());
      painterGoalKeeper.clipRegionSpriteWH(context,keeperCenter.getWidth(),keeperCenter.getHeight(),posKeeper);
      painterGrass.simpleDraw(context);
      painterBall.draw3(context,ball.getCurrentImage(),pos);
      drawGoalPost();
      context.restore();
     // console.log(posKeeper.x+","+posKeeper.y);
    switch (direction){

      case 1:
        context.save();
        posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeperleft.getWidth(),keeperleft.getHeight());
       painterGoalKeeper.clipRegionSpriteWH(context,keeperleft.getWidth(),keeperleft.getHeight(),posKeeper);
        painterGrass.simpleDraw(context);
        drawGoalPost();
        painterGoalKeeper.draw2(context,keeperleft.getCurrentImage(),posKeeper);
        painterBall.draw3(context,ball.getCurrentImage(),pos);
        context.restore();
        break;
      case 2:
        context.save();
        posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeper90Left.getWidth(),keeper90Left.getHeight());
        painterGoalKeeper.clipRegionSpriteWH(context,keeper90Left.getWidth(),keeper90Left.getHeight(),posKeeper);//add +20 because 45 degree tend to be clip too small
        painterGrass.simpleDraw(context);
        drawGoalPost();
        painterGoalKeeper.draw2(context,keeper90Left.getCurrentImage(),posKeeper);
        painterBall.draw3(context,ball.getCurrentImage(),pos);
        context.restore();
        break;
      case 3:
        context.save();
        posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeperUp.getWidth(),keeperUp.getHeight());
        painterGoalKeeper.clipRegionSpriteWH(context,keeperUp.getWidth(),keeperUp.getHeight(),posKeeper);
        painterGrass.simpleDraw(context);
        drawGoalPost();
       painterGoalKeeper.draw2(context,keeperUp.getCurrentImage(),posKeeper);
        context.restore();
        break;
      case 4:
        context.save();
        posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeper90Right.getWidth(),keeper90Right.getHeight());
        painterGoalKeeper.clipRegionSpriteWH(context,keeper90Right.getWidth()+20,keeper90Right.getHeight()+20,posKeeper); //add +20 because 45 degree tend to be clip too small
        painterGrass.simpleDraw(context);
        drawGoalPost();
        painterGoalKeeper.draw2(context,keeper90Right.getCurrentImage(),posKeeper);
        painterBall.draw3(context,ball.getCurrentImage(),pos);
        context.restore();
        break;
      case 5:
        context.save();
        posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper',keeperRight.getWidth(),keeperRight.getHeight());
        painterGoalKeeper.clipRegionSpriteWH(context,keeperRight.getWidth(),keeperRight.getHeight()+100,posKeeper); //some awardness add 20
        painterGrass.simpleDraw(context);
        drawGoalPost();
        painterBall.draw3(context,ball.getCurrentImage(),pos);
        painterGoalKeeper.draw2(context,keeperRight.getCurrentImage(),posKeeper);

        context.restore();
        break;
      default:
        break;
    }
    }
    setTimeout(Animate, 1 / 60);

    }
  Animate();
  box2d.CollisionDetection(); //problem with collision detection
  box2d.Impluse('ball',((Math.random() * 80) - 39),Math.floor((Math.random() * -30) - 30));
});
var deg2rad = Math.PI/180;
var move= false;
var direction=0;
$(canvas).mouseup(function(e)
{
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





