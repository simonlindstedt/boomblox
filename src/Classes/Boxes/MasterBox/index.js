import Master from "../../Audio/Master";
import BasicBox from "../BasicBox";

export default class MasterBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h, 'Master');
    this.type = "master";
    this.audioNode = new Master();
    this.init();
  }
}
