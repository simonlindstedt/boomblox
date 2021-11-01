// Worker
let timeOutId = null;
let time = 500;
let playing = false;

const run = () => {
  if (playing) {
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
    playing = true;
    run();
  } else if (e.data === "stop") {
    playing = false;
  } else if (e.data.time) {
    time = e.data.time;
  }
};
