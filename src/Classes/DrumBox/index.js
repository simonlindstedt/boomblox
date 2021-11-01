import audio from "../Audio/Audio";
import BasicBox from "../Boxes/BasicBox";
import HiHat from "./sounds/hh_sample.mp3";
import Clap from "./sounds/clap_sample.mp3";
import Bass from "./sounds/bass_sample.mp3";
import MetroWorker from "./MetroWorker?worker";

export default class DrumBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.audioNode;
    this.clapNode;
    this.bassNode;
    this.worker = new MetroWorker();
    this.currentTime;
    this.sequences = {
      hihat: {
        id: 0,
        step: 0,
        sequence: [0, 1, 0, 1],
      },
      clap: {
        id: 1,
        step: 0,
        sequence: [1, 0, 1, 0],
      },
      kick: {
        id: 2,
        step: 0,
        sequence: [1, 1, 1, 0],
      },
    };

    this.samples = [HiHat, Clap, Bass];
    this.buffers = [];

    this.handlePlay();

    this.init();
    this.worker.postMessage("start");
    this.worker.onmessage = (e) => {
      if (e.data === "tick") {
        Object.keys(this.sequences).forEach((key) => {
          let { step, id, sequence } = this.sequences[key];
          step > sequence.length ? (step = 0) : step;

          if (sequence[step]) {
            this.playSound(id);
          }
          this.sequences[key].step++;
        });
      }
    };
  }

  handlePlay() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.playSound(2);
          break;
        case "s":
          this.playSound(1);
          break;
        case "d":
          this.playSound(0);
          break;
      }
    });
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
    // this.audioNode.loop = true;
  };

  async playSound(index) {
    let bufferSource = audio.context.createBufferSource();
    let sample = await fetch(this.samples[index]);
    sample = await sample.arrayBuffer();
    sample = await audio.context.decodeAudioData(sample);

    bufferSource.buffer = sample;
    bufferSource.connect(audio.context.destination);
    bufferSource.start(0);
  }

  // playClap = async () => {
  //   const audioContext = audio.context;
  //   this.clapNode = audioContext.createBufferSource();
  //   const audioBuffer = await fetch(Clap)

  //     .then((res) => res.arrayBuffer())
  //     .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

  //   this.clapNode.buffer = audioBuffer;
  //   this.clapNode.connect(audioContext.destination);
  //   this.clapNode.start();
  //   this.clapNode.loop = true;
  // };

  // playBass = async () => {
  //   const audioContext = audio.context;
  //   this.bassNode = audioContext.createBufferSource();
  //   const audioBuffer = await fetch(Bass)
  //     .then((res) => res.arrayBuffer())
  //     .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

  //   this.bassNode.buffer = audioBuffer;
  //   this.bassNode.connect(audioContext.destination);
  //   this.bassNode.start();
  //   this.bassNode.loop = true;
  // };
}
