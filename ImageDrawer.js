class ImageDrawer{
  constructor(img,coorXOnCanavs, coorYOnCanvas, widthOnCanvas, heightOnCanvas) {
    this._coorXOnCanvas = coorXOnCanavs;
    this._coorYOnCanvas = coorYOnCanvas;
    this._heightOnCanvas = heightOnCanvas;
    this._widthOnCanvas = widthOnCanvas;
    this._loaded=false;
    this._image = img;


  }

  draw(context, sprite) {
    context.drawImage(this._image, sprite[0], sprite[1], sprite[2], sprite[3], this._coorXOnCanvas,  this._coorYOnCanvas,  this._widthOnCanvas, this._heightOnCanvas); //chage CoorXtoM
   // console.log("drawing Image State " +this._loaded);
    console.log("print img on:"+this._coorXOnCanvas,this._coorYOnCanvas);
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
    context.clip();
    context.drawImage(this._image, this._coorXOnCanvas,  this._coorYOnCanvas,this._widthOnCanvas, this._heightOnCanvas);
    context.restore();
  }
  backgroundclipAndDraw(context, spriteToCover){
    context.restore();
    context.save();
    context.rect(spriteToCover._coorXOnCanvas, spriteToCover._coorYOnCanvas, spriteToCover._widthOnCanvas, spriteToCover._heightOnCanvas);
    context.stroke();
    context.clip();
    console.log("erase background on:"+spriteToCover._coorXOnCanvas,spriteToCover._coorYOnCanvas);
   //context.fillRect(img,spriteToCover._coorXOnCanvas, spriteToCover._coorYOnCanvas, spriteToCover._widthOnCanvas, spriteToCover._heightOnCanvas);
    //context.clip();

    context.drawImage(this._image, this._coorXOnCanvas,  this._coorYOnCanvas);
    context.restore();
  }
/*
  moveDrawerToPoint(imageDrawer, locObject) { //need to reduce ball size for better accuracy
    context.clearRect(imageDrawer._coorXOnCanvas, imageDrawer._coorYOnCanvas, imageDrawer._heightOnCanvas, imageDrawer._widthOnCanvas);
    imageDrawer._coorXOnCanvas = locObject.x;
    imageDrawer._coorYOnCanvas = locObject.y;
  }
  */
  }



