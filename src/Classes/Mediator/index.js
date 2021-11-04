import MediatorWorker from "./Worker/MediatorWorker?worker";

export default class Mediator {
  constructor() {
    this.worker = new MediatorWorker();
  }

  post(message) {
    this.worker.postMessage(message);
  }
}
