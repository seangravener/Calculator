class Calculator {
  get displayInput() {
    return this.currentInputs.join("");
  }

  get displayOperands() {
    return this.answers.join(" ");
  }

  get currentAnswer() {
    return [...this.answers].pop();
  }

  get activeHotKeys() {
    return [...this.numberKeys, ...this.operatorKeys, ...this.controlKeys];
  }

  constructor() {
    // this.calculatorMemory = []

    this.el = undefined;
    this.$calcButtons = undefined;
    this.currentOperations = [];
    this.operatorKeys = ["/", "-", "+", "%", "=", "*"];
    this.numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    this.controlKeys = ["Enter", 'Delete', 'Backspace'];
    this.resetKeys = ["c"];

    this.activeOperatorKey = "";
    this.currentInputs = []; // ["1", "0", "0"];
    this.answers = [0]; // ["100", "+", "100", "+"]; <-- must change
    this.initCalculator();

    return this;
  }

  initHotKeys() {
    hotkeys("*", (event) => this.handleKeyPress(event.key));
  }

  initClickEvents() {
    const handleKeyPress = this.handleKeyPress;

    this.$calcButtons = this.query("calcButtons");
    this.$calcButtons.addEventListener("click", (event) =>
      this.handleKeyPress(event.target.textContent)
    );
  }

  handleKeyPress(key) {
    if (this.controlKeys.includes(key) && this.activeOperatorKey) {
      console.log("--controlKey=", key);
      this.answers.push(this.useOperator(
        this.currentAnswer,
        parseInt(this.currentInputs.join(""), 10)
      ))
      this.render()
      return;
    }

    if (this.operatorKeys.includes(key)) {
      this.activeOperatorKey = key;

      if (this.currentAnswer != 0) {
        this.answers.push(this.currentAnswer);
      }

      if (this.activeOperatorKey) {
        this.answers.push(
          this.useOperator(
            this.currentAnswer,
            parseInt(this.currentInputs.join(""), 10)
          )
        );
        this.currentInputs = `${this.currentAnswer}`.split("");
        this.currentOperations.push(this.currentAnswer, this.activeOperatorKey);
      }
      this.render();
      this.debug();
    } else if (this.numberKeys.includes(key)) {
      if (this.activeOperatorKey) {
        this.reset()
      }
      this.currentInputs.push(key);
      this.render();
      this.debug();
    }
  }

  // calculate() {
  //   return this.answers.reduce((currentAnswer, currentValue) => {}, "");
  // }

  // Example for calculation class:
  // https://github.com/WebDevSimplified/Vanilla-JavaScript-Calculator/blob/master/script.js

  // Example of [].reduce()
  // https://github.com/jamiepollock/js-calculator/blob/master/script.js

  // Example of decimal use:
  // https://github.com/ayoisaiah/javascript-calculator/blob/master/main.js

  useOperator(currentAnswer, currentValue) {
    const a = parseInt(currentAnswer, 10);
    const b = parseInt(currentValue, 10);
    const operatorMap = {
      "*": (a, b) => a * b,
      "-": (a, b) => a - b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      Enter: (a, b) => console.log("enter"),
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
    this.currentInputs = [];
    this.currentOperations = [];
    this.activeOperatorKey = "";
  }

  query(id) {
    return document.getElementById(id);
  }

  debug() {
    console.log("activeOperatorKey: ", this.activeOperatorKey);
    // console.log('activeHotKeys: ', this.activeHotKeys)
    console.log(
      "--currentAnswer=",
      this.currentAnswer,
      "--currentInputs=",
      this.currentInputs
    );
    console.log(
      "--answers=",
      this.answers,
      "--currentOperations=",
      this.currentOperations
    );

    console.log(this);
  }
}

export default Calculator;
