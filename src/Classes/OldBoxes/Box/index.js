import { Graphics } from "@pixi/graphics";

export default class Box {
  constructor(x, y, audioContext, oscType = "sine") {
    this.graphics = new Graphics();
    this.graphics.interactive = true;
    this.graphics.dragging = false;
    this.graphics.x = x;
    this.graphics.y = y;
    this.audioContext = audioContext;
    this.soundSource = {};
    this.oscType = oscType;
    this.init();
    this.setUpEvents();
  }

  init() {
    let osc = this.audioContext.createOscillator();
    let oscGain = this.audioContext.createGain();
    osc.type = this.oscType;
    oscGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    osc.start();
    osc.connect(oscGain);
    oscGain.connect(this.audioContext.destination);
    this.soundSource = { osc, oscGain };
  }

  draw() {
    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(0, 0, 100, 100);
  }

  setUpEvents() {
    this.graphics.on("mousedown", (e) => {
      this.graphics.x = e.data.global.x - 50;
      this.graphics.y = e.data.global.y - 50;
      this.graphics.dragging = true;
      console.log("picked up");
    });

    this.graphics.on("mousemove", (e) => {
      if (this.graphics.dragging) {
        console.log("dragging");
        this.soundSource.osc.frequency.setValueAtTime(
          e.data.global.x,
          this.audioContext.currentTime
        );
        this.graphics.x = e.data.global.x - 50;
        this.graphics.y = e.data.global.y - 50;
      }
    });

    this.graphics.on("mouseup", (e) => {
      console.log("dropped");
      this.graphics.x = e.data.global.x - 50;
      this.graphics.y = e.data.global.y - 50;
      this.graphics.dragging = false;
    });
  }
}
