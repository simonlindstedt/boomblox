import Oscillator from "../Audio/Oscillator";
import BasicBox from "../BasicBox";

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, type) {
    super(x, y, w, h);
    this.type = "osc";
    this.canConnect = ["gain"];
    this.audioNode = new Oscillator(type, 440);
    this.init();
  }

  distanceTo(box) {
    let distance = Math.sqrt(
      Math.pow(this.position.x - box.position.x, 2) +
        Math.pow(this.position.y - box.position.y, 2)
    );
    return distance;
  }

  connectTo(box) {
    this.connection.isConnected = true;
    this.connection.boxId = box.id;
    this.connection.boxPosition = box.position;
    box.connection.isConnected = true;
    box.graphics.cube.tint = 0xfff000;
    this.audioNode.connectTo(box.audioNode);
  }

  disconnectFrom(box) {
    this.connection.isConnected = false;
    this.connection.boxId = null;
    this.connection.boxPosition = { x: undefined, y: undefined };
    box.connection.isConnected = false;
    box.graphics.cube.tint = 0xffffff;
    this.audioNode.disconnectFrom(box.audioNode);
  }
}
