import Calculator from "./calculate.js";

export default class CalculatorApp {
  get displayInput() {}

  get displayOperands() {}

  get activeAnswer() {
    this.calculator.memory.recall(1);
  }

  get activeOperator() {
    return this.calculator.operator;
  }

  set activeOperator(key) {
    this.calculator.operator = key;
  }

  constructor() {
    this.resetKeys = ["c"];
    this.operatorKeys = ["/", "-", "+", "%", "=", "*"];
    this.controlKeys = ["Enter", "Delete", "Backspace"];
    this.numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    this.calculator = new Calculator();
    this.el = undefined;
    this.$calcButtons = undefined;
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
    this.$calcButtons = this.query("calcButtons");
    this.$calcButtons.addEventListener("click", (event) =>
      this.handleKeyPress(event.target.textContent)
    );
  }

  handleKeyPress(key) {
    // determine what to do based on mode=

    // Control Key
    if (this.controlKeys.includes(key) && this.activeOperator) {
      console.log("--controlKey=", key);
      this.render();
      return;
    }

    // Toggle operator key
    if (this.operatorKeys.includes(key)) {
      this.activeOperator = key;

      if (this.calculator.input.length) {
        this.calculator.save();
      }

      this.render();
      this.debug();
    }

    // Number key
    else if (this.numberKeys.includes(key)) {
      if (!this.activeOperator) {
        this.calculator.input.reset()
        this.activeOperator = this.calculator.operator
      }
      this.calculator.input.append(key);
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
    ).innerHTML = `${this.activeOperator} ${this.calculator.currentInputValue}`;
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
    console.log("---------------------------------------------");
    console.log(this);
    console.log("^^^------------------------------------------");
  }
}
