import Gain from "../Audio/Gain";
import BasicBox from "../BasicBox";

export default class GainBox extends BasicBox {
  constructor(x, y, w, h, volume = 0.2) {
    super(x, y, w, h);
    this.type = "gain";
    this.slots = [];
    this.numberOfSlots = 3;
    this.canConnect = ["filter"];
    this.audioNode = new Gain();
    this.audioNode.setVolume(volume);
    this.init();
  }

  connectTo(box) {
    if (box.type === "filter") {
      this.connections.push({ id: box.id, position: box.position });
      this.audioNode.volume.connect(box.audioNode.filter);
    }
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.audioNode.volume.disconnect(box.audioNode.filter);
  }

  isConnectedTo(box) {
    return this.connections.find((item) => item.id === box.id) !== undefined;
  }
}
