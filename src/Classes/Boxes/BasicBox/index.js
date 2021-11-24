import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Text } from '@pixi/text';
import icon from './icon/move-symbol.png';

export default class BasicBox {
  constructor(x, y, w, h, mediator, settings = {}) {
    // Object
    this.settings = settings;
    this.mediator = mediator;
    this.id = Math.random().toString(36).substr(2);
    this.position = { x, y };
    this.dimensions = { w, h };
    this.moving = false;
    this.connections = [];
    this.options = [];
    this.settings = settings;
    this.lines = [];

    // Audio
    this.input;
    this.output;

    // Pixi
    this.container = new Container();
    this.container.interactive = true;
    this.container.width = this.dimensions.w;
    this.container.height = this.dimensions.h;
    // this.container.zIndex = 1;

    this.connectionLine = new Graphics();
    // this.connectionLine.zIndex = 0;

    let borderBox = new Graphics();
    borderBox.lineStyle(4, 0xffffff);
    borderBox.drawRect(0, 0, this.dimensions.w, this.dimensions.h);

    let nameOfBox = new Text(this.settings.name, {
      fontFamily: 'Courier New',
      fontSize: 16,
      fill: 0xffffff,
      align: 'center',
    });
    nameOfBox.anchor.x = 0.5;
    nameOfBox.anchor.y = 0.5;
    nameOfBox.x = this.dimensions.w / 2;
    nameOfBox.y = this.dimensions.h / 2;
    this.graphics = {
      border: borderBox,
      cube: new Sprite(),
      grabArea: new Sprite.from(icon),
      name: nameOfBox,
    };

    this.graphics.cube.interactive = true;
    this.graphics.cube.texture = Texture.WHITE;
    this.graphics.cube.tint = 0x000000;
    this.graphics.cube.alpha = 0.7;
    this.graphics.cube.width = this.dimensions.w;
    this.graphics.cube.height = this.dimensions.h;
    this.graphics.cube.cursor = 'pointer';

    this.graphics.grabArea.interactive = true;
    this.graphics.grabArea.cursor = 'grab';
    this.graphics.grabArea.width = this.dimensions.w / 3;
    this.graphics.grabArea.height = this.dimensions.h / 3;
  }

  // Init function
  init() {
    Object.keys(this.graphics).forEach((key) => {
      this.container.addChild(this.graphics[key]);
    });

    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.graphics.grabArea.x =
      this.container.width - this.graphics.grabArea.width - 4;

    this.graphics.cube.on('pointerdown', () => {
      // Post settings
      this.mediator.post({
        box: { id: this.id, type: this.type, settings: this.settings },
      });
    });

    // Pick up
    this.graphics.grabArea.on('pointerdown', (e) => {
      this.graphics.grabArea.cursor = 'grabbing';
      const { x, y } = e.data.global;
      this.moving = true;
      this.setPosition(x, y);
    });

    // Move
    this.graphics.grabArea.on('pointermove', (e) => {
      if (this.moving) {
        const { x, y } = e.data.global;
        this.setPosition(x, y);
      }
    });

    // Drop
    this.graphics.grabArea.on('pointerup', (e) => {
      this.graphics.grabArea.cursor = 'grab';
      const { x, y } = e.data.global;
      this.setPosition(x, y);
      this.moving = false;
    });

    if (this.input && this.output) {
      this.output.setVolume(this.settings.volume);
      this.input.connectTo(this.output);
    }
  }

  // Methods

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

  addToConnectionList(box) {
    this.connections.push({
      id: box.id,
      position: box.position,
      dimensions: box.dimensions,
    });
  }

  draw() {
    this.connectionLine.clear();
    if (this.connections.length > 0) {
      this.connectionLine.clear();
      this.connections.forEach((connection) => {
        this.connectionLine
          .lineStyle(4, 0x7bf3ab, 1)
          .moveTo(this.container.x + this.container.width, this.container.y)
          .lineTo(connection.position.x, connection.position.y);
      });
    }
  }
}
