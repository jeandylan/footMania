function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
var canvas=document.getElementById('canvas');

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
  var painterBall = new ImageDrawer(images[0], canvas.width / 2 - 200 / 2,  canvas.height/1.3 - 200 / 2, 100, 100);

  var painterGrass=new ImageDrawer(images[2],-canvas.width/2,-75,1750,1100);
  //define sprites
  var keeperRight=new Sprite([[820,170,274,115]]);
  var keeperleft=new Sprite([[828,444,275,106]]);
  var keeper90Left=new Sprite([[272,341,275,203]]);
  var keeper90Right=new Sprite([[533,75,275,203]]);
  var keeperUp=new Sprite([[250,555,300,300]]);
  var keeperCenter= new Sprite([[35,69,175,200]]);
  var keeperDown= new Sprite([[0,0,300,300],[0,555,300,300]]);
  var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);
  painterGrass.simpleDraw(context);
  //
  //painterBall.draw(context,ball.getCurrentImage());
  var canvasWidth=document.getElementById('canvas').width;
  var canvasHight=document.getElementById('canvas').height;

  objectList= [{name:"ball",shape:'circle',density:1,friction:0.5,restitution:0.6, x:400-55,y:700, type:'d',radius:45},
    {name:"goalPostBarTop",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:70,width:750,height:20, type:'s'},
    {name:"goalPostBarSideLeft",shape:'rectangle',density:1,friction:0.5,restitution:0.6,x:40,y:200,width:20,height:250, type:"s"},
    {name:"goalPostBarSideRight",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:780,y:200,width:20,height:250, type:'s'},
    {name:"goalKeeper",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:300,width:100,height:200, type:'k'},
    {name:"Goal",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:200,width:740,height:200, type:'k'}];
  box2d.init();
  Objects.create(objectList[0]);
  Objects.create(objectList[2]);
  Objects.create(objectList[3]);
  Objects.create(objectList[1]);
  Objects.create(objectList[4]);
  //Objects.create(objectList[5]);

  var pos=box2d.getMapBodyPositionCanvas('ball');
  var posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper');
  var painterGoalKeeper=new ImageDrawer(images[1],posKeeper.x,posKeeper.y,175,200);
  painterGoalKeeper.draw2(context,keeperCenter.getCurrentImage(),{x:objectList[4].x,y:objectList[4].y});
  function Animate() {
    pos=box2d.getMapBodyPositionCanvas('ball');
    box2d.world.Step(1 / 60, 8, 3);
    box2d.world.ClearForces();
    box2d.world.DrawDebugData();
  box2d.drawDebug();
    context.save();
    ball.loopAllFrames();
    painterGrass.clipRegion2(context,painterBall,pos);
    painterGrass.simpleDraw(context);
    painterBall.draw3(context,ball.getCurrentImage(),pos);
    context.restore();
    if (move) {
    box2d.moveUp(x,y);
      posKeeper=box2d.getMapBodyPositionCanvas('goalKeeper');
    switch (direction){
      case 1:
        painterGoalKeeper.draw2(context,keeperleft.getCurrentImage(),posKeeper);
        break;
      case 2:
        painterGoalKeeper.draw2(context,keeper90Left.getCurrentImage(),posKeeper);
        break;
      case 3:
        painterGoalKeeper.draw2(context,keeperUp.getCurrentImage(),posKeeper);
        break;
      case 4:
        painterGoalKeeper.draw2(context,keeper90Right.getCurrentImage(),posKeeper);
        break;
      case 5:
        painterGoalKeeper.draw2(context,keeperRight.getCurrentImage(),posKeeper);
        break;
      default:
        p
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
x=e.pageX;
y=e.pageY;
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





