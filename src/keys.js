export const _keyBindings = {
  reset: ["c"],
  operators: ["/", "-", "+", "%", "*"],
  controls: ["Enter", "Delete", "Backspace", "="],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
};

export const _keyReducers = [
  { keys: ["Enter", "="], reducer() {} },
  { keys: ["c"], reducer() {} },
  { keys: [""], reducer() {} },
];

let _key = "";

export default class KeyBindings {
  get value() {
    return _key;
  }

  set value(key) {
    _key = `${key}`;
  }

  get type() {
    if (!this.value) return;

    const types = Object.keys(_keyBindings);
    return types.reduce((result, type) => {
      return _keyBindings[type].includes(this.value)
        ? `${result} ${type}`.trim()
        : "";
    });
  }

  constructor(key = "", keyBindings = _keyBindings) {
    // Object.assign(this, keyBindings);
    this.value = key;
    this.reducer = undefined;

    this.press = (calc) => {
      console.log('press!', this.value, this.type)
      console.log(calc.currentOperand)
      calc.currentOperand = '222'
    }
    return this;
  }

  make(key) {
    return new KeyBindings(key)
  }

  get(key) {
    if (key) {
      this.value = key;
    }
    return this;
  }

  isOfType(type, key = this.value) {
    return _keyBindings[type].includes(key);
  }
}
