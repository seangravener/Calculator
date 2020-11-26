export const keys = {
  resetKeys: ["c"],
  operatorKeys: ["/", "-", "+", "%", "=", "*"],
  controlKeys: ["Enter", "Delete", "Backspace"],
  numberKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
};

export function getInputTypes() {
  return keys;
}

const inputDefaults = { operator: "", history: [] };
export default class Input {
  get length() {
    return this.history.length;
  }

  get value() {
    return parseFloat(this.history.join(""));
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
    this.value = `${this.value}${digit}`
  }

  remove(len) {
    this.history.pop()
  }

  reset(state) {
    Object.assign(this, state || inputDefaults);
    return this;
  }
}
