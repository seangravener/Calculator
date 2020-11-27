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

  constructor(state) {
    return this.reset(state);
  }

  append(digit) {
    this.value = `${this.value}${digit}`;
  }

  remove() {
    this.history.pop();
  }

  reset(state) {
    this.operator = "";
    Object.assign(this, state || { operator: "", history: [] });
    return this;
  }
}
