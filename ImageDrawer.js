/**
 * Created by dylan on 21-Mar-16.
 */
class ImageDrawer{
  constructor(imagePath, coorXOnImage, coordYOnImage,  heightBallImage, widthBallImage, coorXOnCanavs, coorYOnCanvas, heightOnCanvas, widthOnCanvas) {
    this.imagePath = imagePath;
    this.coorXOnImage = coorXOnImage;
    this.coorYOnImage = coordYOnImage;
    this.heightBallImage = heightBallImage;
    this.widthBallImage = widthBallImage;
    this.coorXOnCanvas = coorXOnCanavs;
    this.coorYOnCanvas = coorYOnCanvas;
    this.heightOnCanvas = heightOnCanvas;
    this.widthOnCanvas = widthOnCanvas;
    this.image = new Image();
    this.image.src = this.imagePath;
    //this.canvasId = canvasId;

  }

  draw(imageDrawer, canvas) {
    var context = canvas.getContext('2d');

    this.image.onload = function (e) {
      context.drawImage(imageDrawer.image, imageDrawer.coorXOnImage, imageDrawer.coorYOnImage, imageDrawer.heightBallImage, imageDrawer.widthBallImage, imageDrawer.coorXOnCanvas,  imageDrawer.coorYOnCanvas,  imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas); //chage CoorXtoMoveImage to next Sprite
    };
  }

  clearRet(imageDrawer, canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 1700, 1000);
  }
  ///testing
  draw1(imageDrawer, context) {
    this.image.onload = function (e) {
      context.drawImage(imageDrawer.image, imageDrawer.coorXOnImage, imageDrawer.coorYOnImage, imageDrawer.heightBallImage, imageDrawer.widthBallImage, imageDrawer.coorXOnCanvas,  imageDrawer.coorYOnCanvas,  imageDrawer.heightOnCanvas, imageDrawer.widthOnCanvas); //chage CoorXtoMoveImage to next Sprite
    };
  }

  clearRet1(context) {

    context.clearRect(0, 0, 1700, 1000);
  }

  animate(imageDrawer,context,sp){
   console.log(sp.length);
  }
}
