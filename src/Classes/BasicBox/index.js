import { Graphics } from "@pixi/graphics";

export default class BasicBox {
  constructor(x, y, w, h) {
    this.id = Math.random().toString(36).substr(2);
    this.graphics = new Graphics();
    this.graphics.x = x;
    this.graphics.y = y;
    this.graphics.interactive = true;
    this.graphics.cursor = "grab";
    this.moving = false;
    this.height = h;
    this.width = w;
    this.init();
  }

  init() {
    // Pick up
    this.graphics.on("pointerdown", (e) => {
      this.setPosition(e.data.global.x, e.data.global.y);
      this.graphics.cursor = "grabbing";
      this.moving = true;
    });

    // Moving
    this.graphics.on("pointermove", (e) => {
      if (this.moving) {
        this.setPosition(e.data.global.x, e.data.global.y);
      }
    });

    // Drop
    this.graphics.on("pointerup", (e) => {
      this.setPosition(e.data.global.x, e.data.global.y);
      this.graphics.cursor = "grab";
      this.moving = false;
    });
  }

  setPosition(x, y) {
    this.graphics.x = x - this.width / 2;
    this.graphics.y = y - this.width / 2;
  }

  draw() {
    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(0, 0, this.width, this.height);
  }
}
