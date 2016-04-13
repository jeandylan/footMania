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
preloadimages(['ball3.svg','g.png','Grass.jpeg']).done(function(images){
  var canvas=document.getElementById('canvas');
  var context=document.getElementById('canvas').getContext('2d');
  var painterBall = new ImageDrawer(images[0], canvas.width / 2 - 200 / 2,  canvas.height/1.3 - 200 / 2, 200, 200);
  var painterGoalKeeper=new ImageDrawer(images[1],canvas.width / 2 - 200 / 2,0,300,300);
  var painterGrass=new ImageDrawer(images[2],0,canvas.height-(canvas.height*0.75),1750,1100);
  //define sprites
  var keeperRight=new Sprite([[0,0,300,300],[250,0,300,300],[520,0,300,300],[820,0,300,300]]);
  var keeperleft=new Sprite([[0,0,300,300],[250,275,300,300],[545,275,280,270],[831,275,270,300]]);
  var keeperUp=new Sprite([[0,0,300,300],[250,555,300,300]]);
  var keeperDown= new Sprite([[0,0,300,300],[0,555,300,300]]);
  var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);
 painterGrass.simpleDraw(context);
  painterGoalKeeper.draw(context,keeperRight.getCurrentImage());
  painterBall.draw(context,ball.getCurrentImage());
  var canvasWidth=document.getElementById('canvas').width;
  var canvasHight=document.getElementById('canvas').height;
  objectList= [{name:"ball",shape:'circle',density:1,friction:0.5,restitution:0.6, x:400-55,y:700, type:'d',radius:55},
    {name:"goalPostBarTop",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:70,width:750,height:20, type:'s'},
    {name:"goalPostBarSideLeft",shape:'rectangle',density:1,friction:0.5,restitution:0.6,x:40,y:200,width:20,height:250, type:"s"},
    {name:"goalPostBarSideRight",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:780,y:200,width:20,height:250, type:'s'},
    {name:"goalKeeper",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:370,width:100,height:90, type:'k'},
    {name:"Goal",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:200,width:740,height:200, type:'k'}];
  box2d.init();
  Objects.create(objectList[0]);
  Objects.create(objectList[2]);
  Objects.create(objectList[3]);
  Objects.create(objectList[1]);
  Objects.create(objectList[4]);
  Objects.create(objectList[5]);
  function Animate() {
    pos=box2d.getMapBodyPositionCanvas('ball');
    box2d.world.Step(1 / 60, 8, 3);
    box2d.world.ClearForces();
    box2d.world.DrawDebugData();
    context.save();
    ball.loopAllFrames();
    painterGrass.clipRegion2(context,painterBall,pos);
    painterGrass.simpleDraw(context);
    painterBall.draw2(context,ball.getCurrentImage(),pos);
    context.restore();
    setTimeout(Animate, 1 / 60);
    //console.log(box2d.getBodyPosition('ball'));

    $(canvas).mouseup(function(e)
    {
      stopAt.x=e.pageX;
      stopAt.y=e.pageY;
    });
  }
  Animate();
  box2d.CollisionDetection(); //problem with collision detection

//box2d.jointObject("goalKeeperBody","goalKeeperLeg");
//,Math.floor((Math.random() * -30) - 30)
  box2d.Impluse('ball',((Math.random() * 80) - 39),Math.floor((Math.random() * -30) - 30));
});




