import BasicBox from "../BasicBox";
import Filter from "../../Audio/Filter";
import Gain from "../../Audio/Gain";

export default class FilterBox extends BasicBox {
  constructor(x, y, w, h, settings) {
    super(x, y, w, h, settings);
    this.type = "filter";
    this.canConnect = ["master"];
    this.input = new Filter(settings.type, settings.freq);
    this.output = new Gain();
    this.init();
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.output.connectTo(box.input);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.output.disconnectFrom(box.input);
  }
}
