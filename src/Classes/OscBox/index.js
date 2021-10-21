import Oscillator from "../Audio/Oscillator";
import BasicBox from "../BasicBox";

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, type) {
    super(x, y, w, h);
    this.osc = new Oscillator(type, 440);
    this.connected = false;
  }

  isCloseTo(otherBox) {
    let x = otherBox.graphics.x;
    let y = otherBox.graphics.y;

    let distance = Math.sqrt(
      Math.pow(this.graphics.x - x, 2) + Math.pow(this.graphics.y - y, 2)
    );

    return distance <= 200;
  }
  connectTo() {
    this.connected = true;
  }
  disconnectFrom() {
    this.connected = false;
  }
}
