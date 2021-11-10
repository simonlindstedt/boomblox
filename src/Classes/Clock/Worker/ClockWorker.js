let timeOutId = null;
let resolution = 128;
let time = (60000 / 120) * (1 / resolution);
let running = false;

const run = () => {
  if (running) {
    postMessage("tick");
    timeOutId = setTimeout(() => {
      return run();
    }, time);
  } else {
    clearTimeout(timeOutId);
    timeOutId = null;
    return;
  }
};

self.onmessage = (e) => {
  if (e.data === "start") {
    running = true;
    run();
  } else if (e.data === "stop") {
    running = false;
  } else if (e.data.time) {
    time = (60000 / e.data.time) * (1 / resolution);
  } else if (e.data.resolution) {
    resolution = e.data.resolution;
  }
};
