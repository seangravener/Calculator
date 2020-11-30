import KeyBindings from "./keys.js";

const _history = [];

class Input {
  get length() {
    return _history.length;
  }

  get value() {
    return _history.length ? parseFloat(_history.join("")) : "";
  }

  set value(value) {
    _history = `${value}`.split("");
  }

  get display() {
    return `${this.operator} ${this.value}`;
  }

  constructor() {
    this.keys = new KeyBindings();
    return this.reset();
  }

  append(digit) {
    this.value = `${this.value}${digit}`;
  }

  remove() {
    _history.pop();
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
