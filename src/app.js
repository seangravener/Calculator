import Calculator from "./calculate.js";
import KeyBindings from "./keys.js";

export default class CalculatorApp {
  get activeOperator() {
    return this.calculator.operator;
  }

  set activeOperator(key) {
    this.calculator.operator = key;
  }

  constructor() {
    this.el = undefined;
    this.calcButtons = undefined;
    this.calculator = new Calculator();
    this.keys = new KeyBindings(); // keyBindings;
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



    key = this.keys.make(key);
    // determine what to do based on mode=

    if (key.press) {
      key.press(this.calculator);
      /**
       * log things
       * reduce to an action?
       * reduce to a set of function calls?
       */
    } else {
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

      if (this.calculator.input.length) {
        this.calculator.save();
      }

      this.render();
      this.debug();
    }

    // Number key
    else if (key.type === "numbers") {
      // if (!this.activeOperator) {
      //   this.calculator.input.reset()
      //   this.activeOperator = this.calculator.operator
      // }
      this.calculator.input.append(key.value);
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
    ).innerHTML = `${this.activeOperator} ${this.calculator.input.value}`;
    this.query("operationDisplay").innerHTML = JSON.stringify(
      this.calculator.memory.recall()
    );
  }

  reset(type = "all") {
    const resetTypes = {
      all: () => {
        this.calculator.operator = "";
        this.calculator.inputs = [];
        this.calculator.memory.reset();
      },
      display: () => {
        this.calculator.inputs = [];
      },
    };

    resetTypes[type]();
    this.render();
  }

  query(id) {
    return document.getElementById(id);
  }

  debug() {
    console.log(this.calculator);
  }
}
