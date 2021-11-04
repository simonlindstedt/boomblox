import Master from "../../Audio/Master";
import BasicBox from "../BasicBox";

export default class MasterBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = "master";
    this.input = new Master();
    this.input.setVolume(settings.volume);
    this.init();
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === "volume") {
        this.input.setVolume(this.settings.volume);
      }
    });
  }
}
