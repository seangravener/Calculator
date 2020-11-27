export const _keyBindings = {
  reset: ["c"],
  operators: ["/", "-", "+", "%", "=", "*"],
  controls: ["Enter", "Delete", "Backspace"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
};

let _key = "";

export default class KeyBindings {
  get value() {
    return _key;
  }

  set value(key) {
    _key = `${key}`;
  }

  constructor(keyBindings = _keyBindings) {
    Object.assign(this, keyBindings);
    return this;
  }

  key(key) {
    this.value = key;
    return this;
  }

  new(key) {
    return new KeyBindings().key(key);
  }

  isOfType(type, key = this.value) {
    return _keyBindings[type].includes(key);
  }
}
