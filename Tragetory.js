/**
 * Created by dylan on 22-Mar-16.
 */
class Tragetory {
  constructor (speed,p1,p2,imageDrawer) {
    this.distance = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    this.move = this.distance / 70;
    this.xunits = (p2.x - p1.x) / this.move;
    this.yunits = (p2.y - p1.y) / this.move;
    this.x = p1.x;
    this.y = p1.y;
    this.continue=true;
    this.paint=imageDrawer;
    this.maxReduction=imageDrawer._widthOnCanvas*0.2;
    this.sizereduction=0.80;
  }
  moveToPath() {
    if (this.move > 0) {
      this.move--;
      this.x += this.xunits;
      this.y += this.yunits;
      this.paint._coorXOnCanvas=this.x;
      this.paint._coorYOnCanvas=this.y;
      //console.log(this.maxReduction);
     if(this.move <=1){
       this.continue=false;
     }
    }
  }

}