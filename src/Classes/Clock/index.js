import ClockWorker from "./Worker/ClockWorker?worker";

export default class Clock {
  constructor() {
    this.worker = new ClockWorker();
    this.step = 0;
  }

  start() {
    this.worker.postMessage("start");
  }

  stop() {
    this.worker.postMessage("stop");
  }

  setTempo(tempo) {
    tempo = 60000 / tempo;
    this.worker.postMessage({ time: tempo });
  }
}
