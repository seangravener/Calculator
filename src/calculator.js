import { totalizator, input, memory, ui } from "./lib/index.js";
// import Controller from "./controller.js"

const _modules = {
  input: input(),
  memory: memory(),
  totalizator: totalizator(),
  ui: ui(),
};

class App {
  static inject = [];
  _1 = 1;
  stuff = 1;

  constructor() {}

  debug() {
    console.log("debug", this);
    return this;
  }
}

class Calculator extends App {
  constructor() {
    super();
    Object.assign(this, _modules);

    // this.controller = new Controller()
    return this;
  }
}

export default Calculator;
