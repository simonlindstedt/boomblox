import BasicBox from "../BasicBox";
import Filter from "../../Audio/Filter";

export default class FilterBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.type = "filter";
    this.canConnect = ["master"];
    this.audioNode = new Filter();
    this.init();
  }

  connectTo(box) {
    switch (box.type) {
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
}