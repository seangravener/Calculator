import Memory from "./memory.js";
import useFunction from "./functions.js";

const localConfig = {
  operatorKeys: ["/", "-", "+", "%", "=", "*"],
};

export default class Calculate {
  get answer() {
    return this.compute();
  }

  get currentInputValue() {
    return this.inputs.join("");
  }

  get currentOperand() {
    return parseInt(this.currentInputValue, 10);
  }

  set currentOperand(value) {
    this.inputs = `${value}`.split("");
  }

  get previousOperand() {
    return this.memory.recall(2);
    //.filter((operand) => !this.config.operatorKeys.includes(operand));
  }

  //   get operator() {}
  //   set operator() {}

  constructor() {
    this.inputs = [];
    this.memory = new Memory();
    this.operator = "";
    this.config = localConfig;

    this.currentOperand = 5;
    this.operator = "+";
    this.memory.store(this.currentOperand, this.operator);

    this.currentOperand = 5;
    this.operator = "*";
    this.memory.store(this.currentOperand, this.operator);

    this.currentOperand = 2;
    this.operator = "*";
    this.memory.store(this.currentOperand, this.operator);

    // this.currentOperand = 1;
    // this.operator = "";
    // this.memory.store(this.currentOperand, this.operator);
    // this.memory.store(this.compute(), this.operator)

    console.log(
      `this.currentInputValue: ${this.currentInputValue}\n`,
      `this.currentOperand: ${this.currentOperand}\n`,
      `this.previousOperand: ${this.previousOperand}\n`,
      `active operator: ${this.operator}\n\n`
    );

    console.log("mem: ", this.memory);
    console.log("ansewr: ", this.compute());

    // console.log(this.memory);
    // console.log(this.inputs);
    // console.log(this.operator);
  }

  save() {
    this.memory.store(this.currentInputValue, this.operator);
  }

  compute() {
    let localOperator = this.clearOperator();
    const isOperation = (operand) => this.config.operatorKeys.includes(operand);
    const memorySnapshot = this.memory.recall();

    return memorySnapshot.reduce((total, item) => {
      if (isOperation(item)) {
        localOperator = item;
        return total;
      } else if (!isNaN(item)) {
        return useFunction(localOperator, [total, item]);
      }
    });
  }

  clear() {
    this.operator = "";
    this.memory.clear();
  }

  clearOperator() {
    const cache = this.operator;
    this.operator = "";
    return cache;
  }
}
