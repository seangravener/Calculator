export const _keyBindings = {
  reset: ["c"],
  operators: ["/", "-", "+", "%", "*"],
  controls: ["Enter", "Delete", "Backspace", "="],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
};

export const _keyReducers = {
  operators: (result, item) => {},
  numbers: (result, item) => {},
};

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

    return this.types.reduce((result, type) => {
      return _keyBindings[type].keys.includes(this.value)
        ? `${result} ${type}`.trim()
        : "";
    });
  }

  get types() {
    return Object.keys(_keyBindings);
  }

//   get reducer() {
//       const keys = _keyBindings[this.type].keys
//     return keys.reduce(
//       _keyReducers[this.type].bind(this.calculator)
//     );
//   }

  constructor(key = "") {
    // Object.assign(this, ...state);
    this.value = key;
    this.reducer = undefined;

    return this;
  }

  press(calculator) {
    console.log("press!", this.value, this.type);
    console.log(calc);

    this.types;
    _keyReducers[this.value].bind(calculator, this);
  }

  make(key) {
    return new KeyBindings(key);
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
