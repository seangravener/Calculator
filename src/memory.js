export default class Memory {
  constructor(memory = []) {
    this.memory = memory;
    return this;
  }

  store(value, operator) {
    if (!operator) throw new Error("Please supply an operator");
    this.memory.push(parseInt(value, 10), operator);
  }

  recall(location) {
    return location ? this.memory.slice(-location)[0] : this.memory;
  }

  clear() {
    this.memory = [];
  }
}
