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
    //
   // console.log("drawing Image State " +this._loaded);
  }

  clearRet(context) {
    context.clearRect(this._coorXOnCanvas, this._coorYOnCanvas, this._widthOnCanvas, this._heightOnCanvas);
  }
simpleDraw(context){
  context.drawImage(this._image, this._coorXOnCanvas, this._coorYOnCanvas);
}
  clipAndDraw(context){
    context.save();
    context.rect(this._coorXOnCanvas, this._coorYOnCanvas, this._widthOnCanvas, this._heightOnCanvas);
    context.drawImage(this._image, this._coorXOnCanvas,  this._coorYOnCanvas,this._widthOnCanvas, this._heightOnCanvas);
    context.clip();
    context.restore();
  }
  clipRegion(context, spritePainterToClip){
    context.beginPath();
    context.rect(spritePainterToClip._coorXOnCanvas, spritePainterToClip._coorYOnCanvas, spritePainterToClip._widthOnCanvas, spritePainterToClip._heightOnCanvas);
    context.closePath();
    context.clip();
  }
/*
  moveDrawerToPoint(imageDrawer, locObject) { //need to reduce ball size for better accuracy
    context.clearRect(imageDrawer._coorXOnCanvas, imageDrawer._coorYOnCanvas, imageDrawer._heightOnCanvas, imageDrawer._widthOnCanvas);
    imageDrawer._coorXOnCanvas = locObject.x;
    imageDrawer._coorYOnCanvas = locObject.y;
  }
  */
  }



