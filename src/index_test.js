

const _memory = [];
class Memory {
  constructor() {}

  update() {
    _memory.push(1);
  }
}

const _input = [];
const _keys = [];
class Input {
  constructor() {
    this.keys = new Keys();
  }

  update() {
    _input.push("input");
  }
}

class Keys {
  constructor() {}

  get() {
    return _input;
  }

  update() {
    _input.push("key");
  }
}

const app = new App();

app.debug();
app.input.update();
app.debug();
console.log(app.input.keys.get());
