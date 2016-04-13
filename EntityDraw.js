var Objects = {
  create:function(entity){
    switch (entity.shape){
      case "rectangle":
        box2d.createRectangle(entity);
        break;
      case "circle":
        box2d.createCircle(entity);
        break;
    }
  }
};











