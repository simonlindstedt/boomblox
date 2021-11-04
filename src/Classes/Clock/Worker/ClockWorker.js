let timeOutId = null;
let time = 500;
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
    time = e.data.time;
  }
};
