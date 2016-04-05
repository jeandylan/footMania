/**
 * Created by dylan on 30-Mar-16.
 */

function RotateBall(painter,context,sprite,currentTime) {
  if (currentTime - lastAdvance > 100) {
    painter.clearRet(painter, context);
    sprite.loopAllFrames();
    painter.draw(painter, context, sprite.getCurrentImage());
    lastAdvance = currentTime;
    console.log('animate');
  }
}

