import Memory from "./memory.js";
import { calculate } from "./functions/basic.js";
import Input from "./input.js";
import KeyBindings from "./keys.js";

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
    return this.input.operator || this.memory.recall(1) || "";
  }

  set operator(symbol) {
    console.log("--set-operator=", symbol);
    if (this.memory.length && symbol) {
      console.log("--set-memory=", symbol);
      this.memory.set(1, symbol);
    }
    this.input.operator = symbol;
  }

  constructor() {
    this.memory = new Memory();
    this.input = new Input();
    this.keys = new KeyBindings();
  }

  save() {
    console.log("save:", [this.input.value, this.operator]);

    this.memory.store(this.input.value, this.operator);
    this.input.value = this.answer;
    console.log("mem saved", this.memory.recall());
  }

  compute() {
    const snapshot = this.memory.recall();

    return snapshot.length
      ? snapshot.reduce(this.memoryReducer.bind(this))
      : "Err. Nothing in memory to compute.";
  }

  memoryReducer(total, item) {
    let localValue = 0;
    let localOperator = this.operator;
    const key = this.keys.new(item);

    if (key.isOfType("operators")) {
      localOperator = item;
      localValue = total;
    } else if (!isNaN(item)) {
      localValue = calculate(localOperator, [total, item]);
    }
    return localValue;
  }

  clear() {
    this.input.operator = "";
    this.memory.clear();
  }

  mode(mode = "") {
    /**
     *
     */
  }
}
