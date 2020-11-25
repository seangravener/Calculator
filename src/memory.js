export default class Memory {
  constructor(memory = []) {
    this.memory = memory;
    // this.active = [];
    return this;
  }

  store(value, operator) {
    if (!operator) throw new Error("Must supply an operator");
    this.memory.push(parseInt(value, 10), operator);
  }

  recall(location) {
    return this.memory.slice(-location)[0];
  }

  clear() {
    this.memory = [];
  }
}
