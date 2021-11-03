import Master from "../../Audio/Master";
import BasicBox from "../BasicBox";

export default class MasterBox extends BasicBox {
  constructor(x, y, w, h, settings) {
    super(x, y, w, h, settings);
    this.type = "master";
    this.input = new Master();
    this.init();
  }
}
