class ImageDrawer{
  constructor(img,coorXOnCanavs, coorYOnCanvas, widthOnCanvas, heightOnCanvas) {
    this._coorXOnCanvas = coorXOnCanavs;
    this._coorYOnCanvas = coorYOnCanvas;
    this._heightOnCanvas = heightOnCanvas;
    this._widthOnCanvas = widthOnCanvas;
    this._loaded=false;
    this._image = img;
    this._number=0;


  }

  draw(context, sprite) {
    context.drawImage(this._image, sprite[0], sprite[1], sprite[2], sprite[3], this._coorXOnCanvas,  this._coorYOnCanvas,  this._widthOnCanvas, this._heightOnCanvas); //chage CoorXtoM
  }
  draw2(context, sprite,pos) {
    context.drawImage(this._image, sprite[0], sprite[1], sprite[2], sprite[3], pos.x,  pos.y,  sprite[2], sprite[3]); //chage CoorXtoM
  }
  draw3(context, sprite,pos) {
    context.drawImage(this._image, sprite[0], sprite[1], sprite[2], sprite[3], pos.x, pos.y,  this._widthOnCanvas, this._heightOnCanvas); //chage CoorXtoM
  }
  clearRet(context) {
    context.clearRect(this._coorXOnCanvas, this._coorYOnCanvas, this._widthOnCanvas, this._heightOnCanvas);
  }
simpleDraw(context){
  context.drawImage(this._image, this._coorXOnCanvas, this._coorYOnCanvas);
}
  clipRegion(context, spritePainterToClip){
    context.beginPath();
    context.rect(spritePainterToClip._coorXOnCanvas, spritePainterToClip._coorYOnCanvas, spritePainterToClip._widthOnCanvas, spritePainterToClip._heightOnCanvas);
    //context.stroke();
    context.closePath();
    context.clip();
  }
  clipRegion2(context, spritePainterToClip,pos){
    context.beginPath();
    context.rect(pos.x, pos.y, spritePainterToClip._widthOnCanvas, spritePainterToClip._heightOnCanvas);
    //context.stroke();
    context.closePath();
    context.clip();
  }
  }



