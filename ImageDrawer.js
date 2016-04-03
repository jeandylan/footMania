class ImageDrawer{
  constructor(img,coorXOnCanavs, coorYOnCanvas, heightOnCanvas, widthOnCanvas) {
    this._coorXOnCanvas = coorXOnCanavs;
    this._coorYOnCanvas = coorYOnCanvas;
    this._heightOnCanvas = heightOnCanvas;
    this._widthOnCanvas = widthOnCanvas;
    this._loaded=false;
    this._image = img;


  }

  draw(context, sprite) {
    context.drawImage(this._image, sprite[0], sprite[1], sprite[2], sprite[3], this._coorXOnCanvas,  this._coorYOnCanvas,  this._heightOnCanvas, this._widthOnCanvas); //chage CoorXtoM
    console.log("drawing Image State " +this._loaded);
  }

  clearRet(context) {
    context.clearRect(this._coorXOnCanvas, this._coorYOnCanvas, this._heightOnCanvas, this._widthOnCanvas);
  }
simpleDraw(context){
  context.drawImage(this._image, this._coorXOnCanvas, this._coorYOnCanvas);
}
/*
  moveDrawerToPoint(imageDrawer, locObject) { //need to reduce ball size for better accuracy
    context.clearRect(imageDrawer._coorXOnCanvas, imageDrawer._coorYOnCanvas, imageDrawer._heightOnCanvas, imageDrawer._widthOnCanvas);
    imageDrawer._coorXOnCanvas = locObject.x;
    imageDrawer._coorYOnCanvas = locObject.y;
  }
  */
  }



