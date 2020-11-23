class Calculator {
  constructor() {
    this.$el = undefined;
    this.$calcButtons = undefined;
    this.currentOperations = [];
    this.currentAnswer = null;
    this.operatorKeys = ["c", "/", "-", "+", "%", "=", "*", "Enter"];
    this.numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    this.activeHotKeys = "";
    this.initCalculator();

    return this;
  }

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
      console.log("an operator! ... calculate operation!", key);
    } else if (this.numberKeys.includes(key)) {
      console.log("push number: ", key);
    }
  }

  initCalculator() {
    this.$el = this.query("calculatorApp");
    this.operationDisplay = this.query("operationDisplay");
    this.mainDisplay = this.query("mainDisplay");

    this.mainDisplay.innerHTML = `init'd`;
    this.operationDisplay.innerHTML = `123 + 321`;
    this.initClickEvents();
    this.initHotKeys();
  }

  query(id) {
    return document.getElementById(id);
  }
}

export default Calculator;
