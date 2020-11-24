class Calculator {
  get displayInput() {
    return this.currentInputs.join("");
  }

  get displayOperands() {
    return this.currentOperands.join(" ");
  }

  constructor() {
    this.el = undefined;
    this.$calcButtons = undefined;
    this.currentOperations = [];
    this.currentAnswer = null;
    this.operatorKeys = ["c", "/", "-", "+", "%", "=", "*", "Enter"];
    this.numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    this.activeHotKeys = "";

    this.currentInputs = []; // ["1", "0", "0"];
    this.currentOperands = []; // ["100", "+", "100", "+"];
    this.initCalculator();

    return this;
  }

  // calculate {
  //   operandsDisplay.reduce((currentAnswer, currentOperand) => { })
  // }

  initHotKeys() {
    this.activeHotKeys = [...this.numberKeys, ...this.operatorKeys];
    console.log(this.activeHotKeys);
    hotkeys("*", (event) => this.handleKeyPress(event.key));
  }

  initClickEvents() {
    const handleKeyPress = this.handleKeyPress;

    this.$calcButtons = this.query("calcButtons");
    this.$calcButtons.addEventListener("click", (event) =>
      this.handleKeyPress(event.target.textContent)
    );
  }

  handleKeyClick(event) {
    if (event.target.textContent === "1") {
      console.log("Click!");
      this.handleKeyPress(event.target.textContent);
    }
  }

  handleKeyPress(key) {
    // console.log("event.key: ", key);
    if (this.operatorKeys.includes(key)) {
      this.currentOperands.push(this.currentInputs.join(""), key);
      console.log("CALCULATE: ", this.calculate());
      this.render();

      this.currentInputs = [];
      console.log("an operator! ... calculate operation!", key);
    } else if (this.numberKeys.includes(key)) {
      console.log("push number: ", key);
      this.currentInputs.push(key);
      this.render();
    }
  }

  calculate() {
    const currentOperator = ''

    return this.currentOperands.reduce((currentAnswer, currentValue) => {
      const a = parseInt(currentAnswer, 10)
      const b = parseInt(currentValue, 10)

      console.log(`ca: ${a} | cv: ${b}`);
      const isOperator = this.operatorKeys.includes(b);

      if (isOperator) {
        const previousAnswer = a;
        currentOperator = b;

        if (previousAnswer) {
          return this.useOperator(
            this.currentInputs.join(""),
            operator,
            a
          );
        }
      }

      return b;
    }, "");
  }

  useOperator(currentAnswer, operator, currentValue) {
    const a = parseInt(currentAnswer, 10);
    const b = parseInt(currentValue, 10);
    const operatorMap = {
      "*": (a, b) => a * b,
      "-": (a, b) => a - b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      Enter: (a, b) => console.log("enter"),
    };

    return operatorMap[operator](a, b);
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

  query(id) {
    return document.getElementById(id);
  }
}

export default Calculator;
