import Calculate from './calculate.js';

export default class CalculatorApp {
  get displayInput() {
    return this.currentInputs.join("");
  }

  get displayOperands() {
    return this.calcMemory.join(" ");
  }

  get currentAnswer() {
    return [...this.calcMemory].pop();
  }

  constructor() {
    this.calculator = new Calculate()
    console.log(this.calculator)

    this.el = undefined;
    this.$calcButtons = undefined;
    this.calcMemory = [0];

    this.resetKeys = ["c"];
    this.operatorKeys = ["/", "-", "+", "%", "=", "*"];
    this.controlKeys = ["Enter", "Delete", "Backspace"];
    this.numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    this.activeOperatorKey = "";
    this.currentInputs = []; // ["1", "0", "0"];
    this.initCalculator();

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
    // Control Key
    if (this.controlKeys.includes(key) && this.activeOperatorKey) {
      console.log("--controlKey=", key);
      this.calcMemory.push(
        this.useOperator(
          this.currentAnswer,
          parseInt(this.currentInputs.join(""), 10)
        )
      );
      this.render();
      return;
    }

    // Toggle operator key
    if (this.operatorKeys.includes(key)) {
      this.activeOperatorKey = key;

      // if (this.currentAnswer != 0) {
      //   this.calcMemory.push(this.currentAnswer);
      // }

      // if (this.activeOperatorKey) {
      //   this.calcMemory.push(
      //     this.useOperator(
      //       this.currentAnswer,
      //       parseInt(this.currentInputs.join(""), 10)
      //     )
      //   );
      //   this.currentInputs = `${this.currentAnswer}`.split("");
      //   this.calcMemory.push(this.currentAnswer, this.activeOperatorKey);
      // }

      this.render();
      this.debug();
    }

    // Number key
    else if (this.numberKeys.includes(key)) {
      if (this.activeOperatorKey) {
        // reset keys
      }
      this.currentInputs.push(key);
      this.render();
      this.debug();
    }
  }

  // calculate() {
  //   return this.calcMemory.reduce((currentAnswer, currentValue) => {}, "");
  // }

  // Example for calculation class:
  // https://github.com/WebDevSimplified/Vanilla-JavaScript-Calculator/blob/master/script.js

  // Example of [].reduce()
  // https://github.com/jamiepollock/js-calculator/blob/master/script.js

  // Example of decimal use:
  // https://github.com/ayoisaiah/javascript-calculator/blob/master/main.js

  useOperator(total, currentValue) {
    const a = parseInt(total, 10);
    const b = parseInt(currentValue, 10);
    const operatorMap = {
      "*": (a, b) => a * b,
      "-": (a, b) => a - b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      "=": (a, b) => a,
      Enter: (a, b) => a,
    };

    return operatorMap[this.activeOperatorKey](a, b);
  }

  initCalculator() {
    this.el = this.query("calculatorApp");
    this.initClickEvents();
    this.initHotKeys();
    this.render();
  }

  render() {
    this.query("mainDisplay").innerHTML = this.displayInput;
    this.query("operationDisplay").innerHTML = this.displayOperands;
  }

  reset() {
    this.activeOperatorKey = "";
    this.currentInputs = [];
    this.calcMemory = [];
  }

  query(id) {
    return document.getElementById(id);
  }

  debug() {
    console.log('')
    console.log('---------------------------------------------')
    console.log("activeOperatorKey: ", this.activeOperatorKey);
    console.log(
      "--currentAnswer=",
      this.currentAnswer,
      "--currentInputs=",
      this.currentInputs
    );
    console.log("--calcMemory=", this.calcMemory);
    console.log(this);
    console.log('^^^------------------------------------------')
  }
}
