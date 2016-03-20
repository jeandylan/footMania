/**
 * Created by dylan on 21-Mar-16.
 */
class BallSprite{
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
    //this.canvasId = canvasId;

  }

  draw(ballSprite, canvas) {
    var context = canvas.getContext('2d');
    var image = new Image();
    image.src = this.imagePath;
    image.onload = function (e) {
      context.drawImage(image, ballSprite.coorXOnImage, ballSprite.coorYOnImage, ballSprite.heightBallImage, ballSprite.widthBallImage, ballSprite.coorXOnCanvas,  ballSprite.coorYOnCanvas,  ballSprite.heightOnCanvas, ballSprite.widthOnCanvas); //chage CoorXtoMoveImage to next Sprite
    };
  }
}
