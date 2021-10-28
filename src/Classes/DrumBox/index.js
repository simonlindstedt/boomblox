import audio from "../Audio/Audio";
import BasicBox from "../BasicBox";
import HiHat from "./sounds/hh_sample.mp3";
import Clap from "./sounds/clap_sample.mp3";
import Bass from "./sounds/bass_sample.mp3";

export default class DrumBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.audioNode;
    this.clapNode;
    this.bassNode;

    this.playHiHat();

    // this.playClap();

    // this.playBass();

    this.init();
  }

  playHiHat = async () => {
    const audioContext = audio.context;
    this.audioNode = audioContext.createBufferSource();
    const audioBuffer = await fetch(HiHat)
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

    this.audioNode.buffer = audioBuffer;
    this.audioNode.connect(audioContext.destination);
    this.audioNode.start(0);
    this.audioNode.loop = true;
  };

  clock(options) {
    this.tempo = options.tempo;
    this.numBeats = options.numBeats;
    this.handlers = [];
    this.beat = -1;
    this.bar = 0;
    this.start = context.currentTime;
    this._tick = this.tick.bind(this);
    this._tick();
  }

  playClap = async () => {
    const audioContext = audio.context;
    this.clapNode = audioContext.createBufferSource();
    const audioBuffer = await fetch(Clap)
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

    this.clapNode.buffer = audioBuffer;
    this.clapNode.connect(audioContext.destination);
    this.clapNode.start();
    this.clapNode.loop = true;
  };

  playBass = async () => {
    const audioContext = audio.context;
    this.bassNode = audioContext.createBufferSource();
    const audioBuffer = await fetch(Bass)
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

    this.bassNode.buffer = audioBuffer;
    this.bassNode.connect(audioContext.destination);
    this.bassNode.start();
    this.bassNode.loop = true;
  };
}
