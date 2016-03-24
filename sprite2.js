/**
 * Created by dylan on 24-Mar-16.
 *//*
 * this class only takes sprite coordinate and property like image src}
 * */
class Sprite {
  constructor (animationCoordinates) {
    this._animationCoordinates = animationCoordinates;
    this.animationSequence = animationCoordinates;
    this._currentTick = 0;
  }
  getCurrentSpriteFrame() {
  return this._animationCoordinates;
}
  /*used as a queue to getContinuous animate in order it was Ascending declared first element in array get first frame the when no more element , restart*/
  getContinuousSpriteFrame() {
    var currentScreen = this.animationSequence.shift();
    this.animationSequence.push(currentScreen);
    return currentScreen;
  }
}


  /*
  rotate90 () {
    return {left: 800, top: 800, width: 800, height: 800};
  }

  rotate () {
    switch (this._currentTick) {
      case 0:
        this._currentTick += 1;
        return {left: 0, top: 0, width: 800, height: 800};
        break;
      case 1:
        this._currentTick += 1;
        return {left: 800, top: 0, width: 800, height: 800};
        break;
      case 2:
        this._currentTick = 0;
        return {left: 1600, top: 0, width: 800, height: 800};
        break;

    }

  }
  */

