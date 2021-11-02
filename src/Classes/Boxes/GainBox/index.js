import Gain from "../../Audio/Gain";
import BasicBox from "../BasicBox";

export default class GainBox extends BasicBox {
  constructor(x, y, w, h, volume = 0.2) {
    super(x, y, w, h);
    this.type = "gain";
    this.slots = [];
    this.numberOfSlots = 3;
    this.canConnect = ["filter", "master", "reverb"];
    this.audioNode = new Gain();
    this.audioNode.setVolume(volume);
    this.init();
  }

  connectTo(box) {
    // this.connections.push({
    //   id: box.id,
    //   position: box.position,
    //   dimensions: box.dimensions,
    // });
    this.addToConnectionList(box);
    this.audioNode.node.connect(box.audioNode.node);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.audioNode.node.disconnect(box.audioNode.node);
  }
}
