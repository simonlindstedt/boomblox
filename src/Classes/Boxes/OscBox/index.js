import Oscillator from "../../Audio/Oscillator";
import BasicBox from "../BasicBox";

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, type, freq = 440) {
    super(x, y, w, h);
    this.type = "osc";
    this.canConnect = ["gain"];
    this.audioNode = new Oscillator(type, freq);
    this.init();
  }

  connectTo(box) {
    if (
      box.type === "gain" &&
      box.slots.find((item) => item.type === this.type) === undefined
    ) {
      // this.connections.push({
      //   id: box.id,
      //   position: box.position,
      //   dimensions: box.dimensions,
      // });
      this.addToConnectionList(box);
      box.slots.push({ id: this.id, type: this.type });
      this.audioNode.connectTo(box.audioNode);
    }
    return;
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    box.slots = box.slots.filter((item) => item.id !== this.id);
    this.audioNode.disconnectFrom(box.audioNode);
  }
}
