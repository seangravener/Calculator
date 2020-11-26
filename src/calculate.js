import Memory from "./memory.js";
import { calculate } from "./functions/basic.js";
import Input from "./input.js";

const localConfig = {
  operatorKeys: ["/", "-", "+", "%", "=", "*"],
};

export default class Calculator {
  get answer() {
    return this.compute().toString();
  }

  get currentOperand() {
    return this.input.value;
  }

  set currentOperand(value) {
    this.input.value = value;
  }

  get previousOperand() {
    return this.memory.recall(2);
  }

  get operator() {
    return this.input.operator || this.memory.recall(1);
  }

  set operator(symbol) {
    if (this.memory.length && symbol) {
      this.memory.set(1, symbol);
    }
    this.input.operator = symbol
  }

  constructor() {
    this.config = localConfig;
    this.memory = new Memory();
    this.input = new Input();
  }

  save() {
    console.log("save:", [this.input.value, this.operator]);

    this.input.value = this.answer;
    this.memory.store(this.input.value, this.operator);
    console.log('mem saved', this.memory.recall());
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
        return calculate(localOperator, [total, item]);
      }
    });
  }

  clear() {
    this.input.operator = "";
    this.memory.clear();
  }

  getAndResetOperator() {
    const cache = this.input.operator;
    this.input.operator = "";
    return cache;
  }
}
