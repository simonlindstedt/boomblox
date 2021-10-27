import BasicBox from "../BasicBox";
import Filter from "../Audio/Filter";

export default class FilterBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.type = "filter";
    this.audioNode = new Filter();
    this.init();
  }
}
