import KeyBindings from "./keys.js";

class Input {
  get length() {
    return this.history.length;
  }

  get value() {
    return this.history.length ? parseFloat(this.history.join("")) : "";
  }

  set value(value) {
    this.history = `${value}`.split("");
  }

  get display() {
    return `${this.operator} ${this.value}`;
  }

  get mode() {
    return _mode;
  }

  set mode(mode) {
    _mode = mode;
  }

  constructor() {
    this.keys = new KeyBindings();
    return this.reset();
  }

  append(digit) {
    this.value = `${this.value}${digit}`;
  }

  remove() {
    this.history.pop();
  }

  reset(operator = "", value = "") {
    this.operator = operator;
    this.value = value;

    return this;
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new Input());
};

export default run;
