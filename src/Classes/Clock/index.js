import ClockWorker from "./Worker/ClockWorker?worker";

export default class Clock {
  constructor(tempo, resolution) {
    this.worker = new ClockWorker();
    this.step = 0;
    this.tempo;
    this.resolution;
    this.setResolution(resolution);
    this.setTempo(tempo);
  }

  start() {
    this.worker.postMessage("start");
  }

  stop() {
    this.worker.postMessage("stop");
  }

  setResolution(resolution) {
    this.resolution = resolution;
    this.worker.postMessage({ resolution: resolution });
  }

  setTempo(tempo) {
    this.tempo = tempo;
    this.worker.postMessage({ time: tempo });
  }
}
