let _memory = [];

class Memory {
  get length() {
    return _memory.length;
  }

  constructor(memory = []) {
    _memory = memory;
    return this;
  }

  store(value, operator) {
    _memory.push(parseFloat(value), operator);
    return this;
  }

  set(location, value) {
    _memory[_memory.length - location] = value;
    return this;
  }

  recall(location) {
    return location ? _memory.slice(-location)[0] : _memory;
  }

  clear() {
    _memory = [];
    return this;
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new Memory(_memory));
};

export default run;
