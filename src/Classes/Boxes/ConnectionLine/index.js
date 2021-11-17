import { Graphics } from '@pixi/graphics';
import { Polygon } from '@pixi/math';

export default class ConnectionLine {
  constructor(from, to) {
    this.graphics = new Graphics();
    this.id = to.id;
    this.from = from;
    this.to = to;
    this.connected = false;

    this.init();
  }
  init() {
    this.graphics.interactive = true;
    this.graphics.cursor = 'pointer';
    this.graphics.on('pointerdown', (e) => {
      if (!this.connected) {
        this.connected = true;
        this.from.connectTo(this.to);
      } else {
        this.connected = false;
        this.from.disconnectFrom(this.to);
      }
    });
  }

  bounds(distance, points) {
    // https://jsfiddle.net/bigtimebuddy/xspmq8au/ thanks Matt.
    const numPoints = points.length / 2;
    const output = new Array(points.length * 2);
    for (let i = 0; i < numPoints; i++) {
      const j = i * 2;

      // Position of current point
      const x = points[j];
      const y = points[j + 1];

      // Start
      const x0 = points[j - 2] !== undefined ? points[j - 2] : x;
      const y0 = points[j - 1] !== undefined ? points[j - 1] : y;

      // End
      const x1 = points[j + 2] !== undefined ? points[j + 2] : x;
      const y1 = points[j + 3] !== undefined ? points[j + 3] : y;

      // Get the angle of the line
      const a = Math.atan2(-x1 + x0, y1 - y0);
      const deltaX = distance * Math.cos(a);
      const deltaY = distance * Math.sin(a);

      // Add the x, y at the beginning
      output[j] = x + deltaX;
      output[j + 1] = y + deltaY;

      // Add the reflected x, y at the end
      output[output.length - 1 - j - 1] = x - deltaX;
      output[output.length - 1 - j] = y - deltaY;
    }
    // close the shape
    output.push(output[0], output[1]);

    return new Polygon(output);
  }

  draw() {
    this.graphics.clear();
    this.graphics
      .lineStyle(4, 0xff0000, 0.5)
      .moveTo(
        this.from.container.x + this.from.container.width,
        this.from.container.y
      )
      .lineTo(this.to.position.x, this.to.position.y);
    let bounds = this.bounds(
      this.graphics.line.width,
      this.graphics.currentPath.points
    );
    this.graphics.hitArea = bounds;
  }
}
