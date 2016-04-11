var Objects = {
  create:function(entity){
    switch (entity.shape){
      case "rectangle":
        box2d.createRectangle(entity);
        break;
      case "circle":
        box2d.createCircle(entity);
        break;
    }
  }
};
var canvasWidth=document.getElementById('canvas').width;
var canvasHight=document.getElementById('canvas').height;
en= [{name:"ball",shape:'circle',density:1,friction:0.5,restitution:0.6, x:400-55,y:700, type:'d',radius:55},
  {name:"goalPostBarTop",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:70,width:750,height:20, type:'s'},
  {name:"goalPostBarSideLeft",shape:'rectangle',density:1,friction:0.5,restitution:0.6,x:40,y:200,width:20,height:250, type:"s"},
  {name:"goalPostBarSideRight",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:780,y:200,width:20,height:250, type:'s'},
  {name:"goalKeeper",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:370,width:100,height:90, type:'k'},
  {name:"Goal",shape:'rectangle',density:1,friction:0.5,restitution:0.6, x:400,y:200,width:740,height:200, type:'k'}];
box2d.init();
Objects.create(en[0]);
Objects.create(en[2]);
Objects.create(en[3]);
Objects.create(en[1]);
Objects.create(en[4]);
Objects.create(en[5]);
box2d.drawDebug();
box2d.animate();
box2d.CollisionDetection(); //problem with collision detection

//box2d.jointObject("goalKeeperBody","goalKeeperLeg");
//,Math.floor((Math.random() * -30) - 30)
box2d.Impluse('ball',((Math.random() * 80) - 39),Math.floor((Math.random() * -30) - 30));









