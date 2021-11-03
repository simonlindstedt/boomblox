import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import trashIcon from './img/bytesize_trash.svg';

export default class TrashCan {
  constructor(x, y, w, h) {
    this.position = { x, y };
    this.dimensions = { w, h };

    this.container = new Container();
    this.container.width = this.dimensions.w;
    this.container.height = this.dimensions.h;

    this.image = new Sprite.from(trashIcon);

    this.image.width = this.dimensions.w;
    this.image.height = this.dimensions.h;
    this.init();
  }

  init() {
    this.container.addChild(this.image);
    this.container.x = this.position.x;
    this.container.y = this.position.y;
  }
}
