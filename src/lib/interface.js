import { totalizator, input, memory } from "./index.js";

class UserInterface {
  get activeOperator() {
    return this.totalizator.operator;
  }

  set activeOperator(key) {
    this.totalizator.operator = key;
  }

  constructor() {
    this.totalizator = totalizator();
    this.memory = memory();
    this.input = input();

    this.el = undefined;
    this.calcButtons = undefined;
    this.initCalculator();

    // this.currentOperand = 1;
    // this.operator = "+";
    // this.memory.store(this.currentOperand, this.operator);
    return this;
  }

  initHotKeys() {
    hotkeys("*", (event) => this.handleKeyPress(event.key));
  }

  initClickEvents() {
    this.calcButtons = this.query("calcButtons");
    this.calcButtons.addEventListener("click", (event) =>
      this.handleKeyPress(event.target.textContent)
    );
  }

  handleKeyPress(key) {
    // ctrl+a, ctrl+b, =, Enter => compute, save to memory, update display with answer, flag to clear display upon next number
    // 1, 2, 3 => update input.value
    // delete, backspace => update input and memory
    // +, -, / => perform operation

    /**
     *
     * [operatorsList].reduce(key.reducer+)
     * key.reduce(calculator)
     * reducer sets up the calc state and resolves to this.answer
     */

    key = this.input.keys.make(key);
    // determine what to do based on mode=

    if (key.press) {
      key.press(this.totalizator);
    }

    // Control Key
    if (key.type === "controls" && this.activeOperator) {
      console.log("--controlKey=", key);

      this.render();
      return;
    }

    // Toggle operator key
    if (key.type === "operators") {
      this.activeOperator = key.value;

      if (this.totalizator.input.length) {
        this.totalizator.save();
      }

      this.render();
      this.debug();
    }

    // Number key
    else if (key.type === "numbers") {
      // if (!this.activeOperator) {
      //   this.totalizator.input.reset()
      //   this.activeOperator = this.totalizator.operator
      // }
      this.totalizator.input.append(key.value);
      this.render();
      this.debug();
    }
  }

  // Example for calculation class:
  // https://github.com/WebDevSimplified/Vanilla-JavaScript-Calculator/blob/master/script.js

  // Example of [].reduce()
  // https://github.com/jamiepollock/js-calculator/blob/master/script.js

  // Example of decimal use:
  // https://github.com/ayoisaiah/javascript-calculator/blob/master/main.js

  initCalculator() {
    this.el = this.query("calculatorApp");
    this.initClickEvents();
    this.initHotKeys();
    this.render();
  }

  render() {
    this.query(
      "mainDisplay"
    ).innerHTML = `${this.activeOperator} ${this.input.value}`;
    this.query("operationDisplay").innerHTML = JSON.stringify(
      this.memory.recall()
    );
  }

  reset(type = "all") {
    const resetTypes = {
      all: () => {
        this.totalizator.operator = "";
        this.inputs = [];
        this.memory.reset();
      },
      display: () => {
        this.inputs = [];
      },
    };

    resetTypes[type]();
    this.render();
  }

  query(id) {
    return document.getElementById(id);
  }

  debug() {
    console.log(this);
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new UserInterface());
};

export default run;
