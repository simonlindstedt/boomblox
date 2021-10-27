import Gain from "../../Audio/Gain";
import BasicBox from "../BasicBox";

export default class GainBox extends BasicBox {
  constructor(x, y, w, h, volume = 0.2) {
    super(x, y, w, h);
    this.type = "gain";
    this.slots = [];
    this.numberOfSlots = 3;
    this.canConnect = ["filter", "master"];
    this.audioNode = new Gain();
    this.audioNode.setVolume(volume);
    this.init();
  }

  connectTo(box) {
    switch (box.type) {
      case "filter":
        this.connections.push({ id: box.id, position: box.position });
        this.audioNode.node.connect(box.audioNode.node);
        break;
      case "master":
        this.connections.push({ id: box.id, position: box.position });
        this.audioNode.node.connect(box.audioNode.node);
        break;
      default:
        return;
    }
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.audioNode.node.disconnect(box.audioNode.node);
  }

  // isConnectedTo(box) {
  //   return this.connections.find((item) => item.id === box.id) !== undefined;
  // }
}
