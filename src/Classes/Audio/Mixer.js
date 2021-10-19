export default class Mixer {
  constructor() {
    this.list = [];
  }
  addToList(soundSource, gain) {
    this.list.push({
      id: Math.floor(Math.random() * 1000),
      soundSource,
      gain,
    });
  }
  removeFromList(id) {
    this.list = this.list.filter((item) => item.id !== id);
  }
}
