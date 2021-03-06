class ImageDrawer{
  constructor(coorXOnCanavs, coorYOnCanvas, widthOnCanvas, heightOnCanvas) {
    this._coorXOnCanvas = coorXOnCanavs;
    this._coorYOnCanvas = coorYOnCanvas;
    this._heightOnCanvas = heightOnCanvas;
    this._widthOnCanvas = widthOnCanvas;
    this._loaded=false;
    this._image = null;
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
  simpleDraw2(context){
    context.drawImage(this._image, this._coorXOnCanvas, this._coorYOnCanvas,this._widthOnCanvas, this._heightOnCanvas);
  }
  clipSpriteRegion(context, spritePainterToClip){
    context.beginPath();
    context.rect(spritePainterToClip._coorXOnCanvas, spritePainterToClip._coorYOnCanvas, spritePainterToClip._widthOnCanvas, spritePainterToClip._heightOnCanvas);
    //context.stroke();
    context.closePath();
    context.clip();
  }
  clipRegionSprite(context, spritePainterToClip, posSprite){
    context.beginPath();
    context.rect(posSprite.x, posSprite.y, spritePainterToClip._widthOnCanvas, spritePainterToClip._heightOnCanvas);
    //context.stroke();
    context.closePath();
    context.clip();
  }
  clipRegionSpriteWH(context, width, height, posSprite){
    context.beginPath();
    context.rect(posSprite.x, posSprite.y, width, height);
    //context.stroke();
    context.closePath();
    context.clip();
  }
  }



