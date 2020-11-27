import KeyBindings from "./keys.js";

const _modes = ["input", "function"];
let _mode = "input";

export default class Input {
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

  constructor(state) {
    this.keys = new KeyBindings();
    return this.reset(state);
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
