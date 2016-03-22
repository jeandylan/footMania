/**
 * Created by dylan on 21-Mar-16.
 */
class ImageDrawer{
  constructor(imagePath, coorXOnCanavs, coorYOnCanvas, heightOnCanvas, widthOnCanvas) {
    this.imagePath = imagePath;

    this.coorXOnCanvas = coorXOnCanavs;
    this.coorYOnCanvas = coorYOnCanvas;
    this.heightOnCanvas = heightOnCanvas;
    this.widthOnCanvas = widthOnCanvas;
    this.image = new Image();
    this.image.src = this.imagePath;
    //this.canvasId = canvasId;

  }

  draw(imageDrawer, context, sprite) {
    context.clearRect(imageDrawer.coorXOnCanvas, imageDrawer.coorYOnCanvas, imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas);
      context.drawImage(imageDrawer.image, sprite.left, sprite.top, sprite.height, sprite.width, imageDrawer.coorXOnCanvas,  imageDrawer.coorYOnCanvas,  imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas); //chage CoorXtoM

  }

  clearRet(imageDrawer, context) {


  }

  }



