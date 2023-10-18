class Mazeglutton {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.currentFrame = 1;
    this.frameCount = 7;
    this.map = map;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {}

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y -= this.speed;
        break;
    }
  }
  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  checkCollision() {
    if (
      this.map[this.getMapY()][this.getMapX()] == 1 ||
      this.map[this.getMapYRightSide()][this.getMapX()] == 1 ||
      this.map[this.getMapY()][this.getMapXRightSide()] == 1 ||
      this.map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
    ) {
      return true;
    }
    return false;
  }

  checkCollision() {
    if (
      map[this.getMapY()][this.getMapX()] == 1 ||
      map[this.getMapYRightSide()][this.getMapX()] == 1 ||
      map[this.getMapY()][this.getMapXRightSide()] == 1 ||
      map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
    ) {
      return true;
    }
    return false;
  }

  checkGhostCollision() {}

  changeDirectionIfPossible() {}

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();
    canvasContext.translate(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2
    );

    canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

    canvasContext.translate(
      -this.x - oneBlockSize / 2,
      -this.y - oneBlockSize / 2
    );

    canvasContext.drawImage(
      mazegluttonFrames,
      (this.currentFrame - 1) / oneBlockSize,
      0,
      oneBlockSize,
      oneBlockSize,
      this.x,
      this.y,
      this.width,
      this.height
    );

    canvasContext.restore();
  }

  getMapX() {
    return Math.floor(this.x / oneBlockSize); // Użyj Math.floor, aby zaokrąglić w dół
  }

  getMapY() {
    return Math.floor(this.y / oneBlockSize); // Użyj Math.floor, aby zaokrąglić w dół
  }

  getMapXRightSide() {
    return Math.floor((this.x + this.width) / oneBlockSize); // Użyj Math.floor, aby zaokrąglić w dół
  }

  getMapYRightSide() {
    return Math.floor((this.y + this.height) / oneBlockSize); // Użyj Math.floor, aby zaokrąglić w dół
  }
}