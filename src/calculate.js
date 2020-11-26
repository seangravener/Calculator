import Memory from "./memory.js";
import { calculate } from "./functions/basic.js";

const localConfig = {
  operatorKeys: ["/", "-", "+", "%", "=", "*"],
};

export default class Calculator {
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
  }

  constructor() {
    this.memory = new Memory([]);
    this.config = localConfig;
    this.inputs = [];
    this.operator = "";
  }

  save() {
    this.memory.store(this.currentInputValue, this.operator);
  }

  compute() {
    let localOperator = this.getAndResetOperator();
    const isOperation = (operand) => this.config.operatorKeys.includes(operand);
    const snapshot = this.memory.recall();

    return snapshot.reduce((total, item) => {
      if (isOperation(item)) {
        localOperator = item;
        return total;
      } else if (!isNaN(item)) {
        this.currentOperand = calculate(localOperator, [total, item]);
        return this.currentOperand
      }
    });
  }

  clear() {
    this.operator = "";
    this.memory.clear();
  }

  getAndResetOperator() {
    const cache = this.operator;
    this.operator = "";
    return cache;
  }
}
