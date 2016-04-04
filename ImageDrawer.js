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
  backgroundclipAndDraw(context, spriteToCover){
    context.save();
    this._number+=-1;
    context.beginPath();
    context.rect(spriteToCover._coorXOnCanvas, spriteToCover._coorYOnCanvas, spriteToCover._widthOnCanvas, spriteToCover._heightOnCanvas);
    context.closePath();
    context.clip();
    context.drawImage(this._image, this._coorXOnCanvas,  this._coorYOnCanvas);
    context.restore();
    this._number+=1;
  }
/*
  moveDrawerToPoint(imageDrawer, locObject) { //need to reduce ball size for better accuracy
    context.clearRect(imageDrawer._coorXOnCanvas, imageDrawer._coorYOnCanvas, imageDrawer._heightOnCanvas, imageDrawer._widthOnCanvas);
    imageDrawer._coorXOnCanvas = locObject.x;
    imageDrawer._coorYOnCanvas = locObject.y;
  }
  */
  }



