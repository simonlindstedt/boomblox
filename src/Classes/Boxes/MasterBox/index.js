import Master from "../../Audio/Master";
import BasicBox from "../BasicBox";

export default class MasterBox extends BasicBox {
  constructor(x, y, w, h, settings) {
    super(x, y, w, h, settings);
    this.type = "master";
    this.input = new Master();
    this.input.setVolume(settings.volume);
    this.init();
  }

  changeSettings(settings) {
    Object.keys(settings).forEach((setting) => {
      if (setting === "volume") {
        this.settings.volume = settings[setting];
        this.input.setVolume(this.settings.volume);
      }
    });
  }
}
