/**
 * Created by dylan on 01-Apr-16.
 */
var painterBall = new ImageDrawer(images[0], canvas.width / 2 - 200 / 2,  canvas.height/1.3 - 200 / 2, 200, 200);
var painterGoalKeeper=new ImageDrawer(images[1],0,0,300,300);
//define sprites
var keeperRight=new Sprite([[0,0,300,300],[250,0,300,300],[520,0,300,300],[820,0,300,300]]);
var ball = new Sprite([[0, 0, 800, 800], [800, 0, 800, 800], [1600, 0, 800, 800]]);