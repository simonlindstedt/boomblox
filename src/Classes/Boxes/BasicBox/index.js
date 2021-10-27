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
    this.connections = [];

    this.container = new Container();
    this.container.interactive = true;
    this.container.width = this.dimensions.w;
    this.container.height = this.dimensions.h;

    this.graphics = {
      cube: new Sprite(),
      grabArea: new Sprite(),
    };

    this.graphics.cube.texture = Texture.WHITE;
    this.graphics.cube.width = this.dimensions.w;
    this.graphics.cube.height = this.dimensions.h;

    this.graphics.grabArea.interactive = true;
    this.graphics.grabArea.cursor = "grab";
    this.graphics.grabArea.texture = Texture.WHITE;
    this.graphics.grabArea.tint = 0x00ff00;
    this.graphics.grabArea.width = this.dimensions.w / 3;
    this.graphics.grabArea.height = this.dimensions.h / 3;

    this.connectionLine = new Graphics();
  }

  init() {
    Object.keys(this.graphics).forEach((key) => {
      this.container.addChild(this.graphics[key]);
    });

    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.graphics.grabArea.x =
      this.container.width - this.graphics.grabArea.width;

    this.graphics.grabArea.on("pointerdown", (e) => {
      this.graphics.grabArea.cursor = "grabbing";
      const { x, y } = e.data.global;
      this.moving = true;
      this.setPosition(x, y);
    });
    this.graphics.grabArea.on("pointermove", (e) => {
      if (this.moving) {
        const { x, y } = e.data.global;
        this.setPosition(x, y);
      }
    });
    this.graphics.grabArea.on("pointerup", (e) => {
      this.graphics.grabArea.cursor = "grab";
      const { x, y } = e.data.global;
      this.setPosition(x, y);
      this.moving = false;
    });
  }

  setPosition(x, y) {
    if (this.moving) {
      this.container.x =
        x - this.dimensions.w + this.graphics.grabArea.width / 2;
      this.container.y = y - this.graphics.grabArea.height / 2;
    } else {
      this.container.x = x;
      this.container.y = y;
    }

    this.position.x = this.container.x;
    this.position.y = this.container.y;
  }

  distanceTo(box) {
    let distance = Math.sqrt(
      Math.pow(this.position.x - box.position.x, 2) +
        Math.pow(this.position.y - box.position.y, 2)
    );
    return distance;
  }

  isConnectedTo(box) {
    return this.connections.find((item) => item.id === box.id) !== undefined;
  }

  draw() {
    this.connectionLine.clear();
    if (this.connections.length > 0) {
      this.connectionLine.clear();
      this.connections.forEach((connection) => {
        this.connectionLine
          .lineStyle(2, 0xff0000, 1)
          .moveTo(this.container.x, this.container.y)
          .lineTo(connection.position.x, connection.position.y);
      });
    }
  }
}
