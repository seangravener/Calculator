import { input, memory } from "./index.js";
import { arithmetic } from "../functions/basic.js";

class Totalizator {
  get answer() {
    this.save()
    this.input.reset()
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
    this.input = input()
    this.memory = memory()
    // experiment with modules exporting a new instance() of themselves
    // this.memory = new Memory();
    // this.input = new Input();
    // this.keys = new KeyBindings();
    // // this.mode = new Mode();
  }

  save() {
    // this.mode('hold') // don't accept input
    this.memory.store(this.input.value, this.operator);
    this.input.reset('', this.compute());

    return this.input.value
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
    const key = this.input.keys.get(item);

    if (key.isOfType("operators")) {
      localOperator = item;
      localValue = total;
    } else if (!isNaN(item)) {
      localValue = arithmetic(localOperator, [total, item]);
    }
    return localValue;
  }

  clear() {
    this.input.operator = "";
    this.memory.clear();
  }
}

let _instance = undefined;
const run = () => {
  return _instance || (_instance = new Totalizator());
};

export default run;