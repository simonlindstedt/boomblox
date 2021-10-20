import Oscillator from "../Audio/Oscillator.js";
import Audio from "../Audio/Audio.js";
import Box from "../Box";

export default class SineBox extends Box {
  constructor(audioContext) {
    super(0, 0, audioContext, "sine");
  }
}
