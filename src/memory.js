export default class Memory {
  get length() {
    return this.memory.length;
  }

  constructor(memory = []) {
    this.memory = memory;
    return this;
  }

  store(value, operator) {
    this.memory.push(parseFloat(value), operator);
    return this;
  }

  set(location, value) {
    this.memory[this.memory.length - location] = value;
    return this;
  }

  recall(location) {
    return location ? this.memory.slice(-location)[0] : this.memory;
  }

  clear() {
    this.memory = [];
    return this;
  }
}
