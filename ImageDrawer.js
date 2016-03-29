class ImageDrawer{
  constructor(imagePath, coorXOnCanavs, coorYOnCanvas, heightOnCanvas, widthOnCanvas) {
    this.imagePath = imagePath;
    this.coorXOnCanvas = coorXOnCanavs;
    this.coorYOnCanvas = coorYOnCanvas;
    this.heightOnCanvas = heightOnCanvas;
    this.widthOnCanvas = widthOnCanvas;
    this.image = new Image();
    this.image.src = this.imagePath;
  }

  draw(imageDrawer, context, sprite) {
    context.drawImage(imageDrawer.image, sprite[0], sprite[1], sprite[2], sprite[3], imageDrawer.coorXOnCanvas,  imageDrawer.coorYOnCanvas,  imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas); //chage CoorXtoM
  }

  moveDrawer(imageDrawer) {
    imageDrawer.coorXOnCanvas += 10;
    imageDrawer.coorYOnCanvas += 10;
  }

  reduceDrawingSize(imageDrawer) {
    imageDrawer.heightOnCanvas = imageDrawer.heightOnCanvas *0.85;
    imageDrawer.widthOnCanvas = imageDrawer.widthOnCanvas * 0.85;
  }

  clearRet(imageDrawer, context) {
    context.clearRect(imageDrawer.coorXOnCanvas, imageDrawer.coorYOnCanvas, imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas);
  }

  moveDrawerToPoint(imageDrawer, locObject) { //need to reduce ball size for better accuracy
    context.clearRect(imageDrawer.coorXOnCanvas, imageDrawer.coorYOnCanvas, imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas);
    imageDrawer.coorXOnCanvas = locObject.x;
    imageDrawer.coorYOnCanvas = locObject.y;
  }
  }



