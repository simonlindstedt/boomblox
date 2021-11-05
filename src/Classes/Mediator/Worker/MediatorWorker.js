self.addEventListener("message", (e) => {
  if (e.data.box) {
    postMessage({ box: e.data.box });
  }
});
