import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Texture } from "@pixi/core";
import { Graphics } from "@pixi/graphics";

export default class BasicBox {
  constructor(x, y, w, h) {
    this.id = Math.random().toString(36).substr(2);
    this.position = { x, y };
    this.dimensions = { w, h };
    this.moving = false;
    this.connection = {
      isConnected: false,
      boxId: null,
      boxPosition: { x: undefined, y: undefined },
    };

    this.container = new Container();
    this.container.interactive = true;
    this.container.width = this.dimensions.w;
    this.container.height = this.dimensions.h;

    this.graphics = {
      cube: new Sprite(),
    };

    this.graphics.cube.texture = Texture.WHITE;
    this.graphics.cube.width = this.dimensions.w;
    this.graphics.cube.height = this.dimensions.h;

    this.connectionLine = new Graphics();
  }

  init() {
    Object.keys(this.graphics).forEach((key) => {
      this.container.addChild(this.graphics[key]);
    });

    this.container.x = this.position.x;
    this.container.y = this.position.y;

    this.container.on("pointerdown", (e) => {
      const { x, y } = e.data.global;
      this.moving = true;
      this.setPosition(x, y);
    });
    this.container.on("pointermove", (e) => {
      if (this.moving) {
        const { x, y } = e.data.global;
        this.setPosition(x, y);
      }
    });
    this.container.on("pointerup", (e) => {
      const { x, y } = e.data.global;
      this.setPosition(x, y);
      this.moving = false;
    });
  }

  setPosition(x, y) {
    if (this.moving) {
      this.container.x = x - this.dimensions.w / 2;
      this.container.y = y - this.dimensions.h / 2;
    } else {
      this.container.x = x;
      this.container.y = y;
    }

    this.position.x = this.container.x;
    this.position.y = this.container.y;
  }

  draw() {
    this.connectionLine.clear();
    if (this.connection.isConnected) {
      this.connectionLine
        .clear()
        .lineStyle(1, 0xff0000, 1)
        .moveTo(this.container.x, this.container.y)
        .lineTo(this.connection.boxPosition.x, this.connection.boxPosition.y);
    }
  }
}
