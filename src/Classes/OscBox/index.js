import Oscillator from "../Audio/Oscillator";
import BasicBox from "../BasicBox";

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, type) {
    super(x, y, w, h);
    this.connection = { isConnected: false, to: null };
    this.osc = new Oscillator(type, 440);
  }

  distanceTo(box) {
    let distance = Math.sqrt(
      Math.pow(this.graphics.x - box.graphics.x, 2) +
        Math.pow(this.graphics.y - box.graphics.y, 2)
    );

    return distance;
  }

  connectTo(box, number) {
    if (!this.connection.isConnected && !box.connection.isConnected) {
      this.connection.isConnected = true;
      this.connection.to = number;
      box.connection.isConnected = true;
      box.graphics.tint = 0xfff000;
      this.osc.connectTo(box.gain);
    }
  }

  disconnectFrom(box) {
    if (this.connection.isConnected && box.connection.isConnected) {
      this.connection.isConnected = false;
      this.connection.to = null;
      box.connection.isConnected = false;
      box.graphics.tint = 0xffffff;
      this.osc.disconnectFrom(box.gain);
    }
  }
}
