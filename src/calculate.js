import Memory from "./memory.js";
import useFunction from "./functions.js";

const localConfig = {
  operatorKeys: ["/", "-", "+", "%", "=", "*"],
};

export default class Calculate {
  get answer() {}

  get currentInputValue() {
    return this.inputs.join("");
  }

  get currentOperand() {
    return parseInt(this.currentInputValue, 10);
  }

  set currentOperand(value) {
    this.inputs = `${value}`.split("");
  }

  // if (this.operator) {  memory.store  }

  get previousOperand() {
    return this.memory.recall(1);
    // .filter((operand) => !this.config.operatorKeys.includes(operand));
  }

  //   get operator() {}
  //   set operator() {}

  constructor() {
    this.inputs = [0];
    this.memory = new Memory();
    this.operator = "";
    this.config = localConfig;

    this.currentOperand = 100;
    this.operator = "+";
    this.memory.store(this.currentOperand, this.operator);

    this.currentOperand = 2;
    // this.operator = "";
    // this.memory.store(this.currentOperand, this.operator);
    console.log("ansewr: ", this.compute());
    // this.memory.store(this.compute(), this.operator)

    console.log(
      `this.currentInputValue: ${this.currentInputValue}`,
      this.currentOperand,
      this.previousOperand,
      this.operator
    );
    console.log(this.memory);

    // console.log(this.memory);
    // console.log(this.inputs);
    // console.log(this.operator);
    // console.log("prevOp", this.previousOperand);
  }

  save() {
    this.memory.store(this.currentInputValue, this.operator);
  }
  compute() {
    // this.memory.reduce()

    // useFunction('*', [1,2,3])
    // console.log('compute!', useFunction('*', () => {}))
    return useFunction(this.operator, (calcFunction) => {
      console.log(calcFunction);
      calcFunction(this.previousOperand, this.currentOperand);
    });
    // this.useFunction[this.operator](this.previousOperand, this.currentOperand)
  }

  clear() {
    this.operator = "";
    this.memory.clear();
  }
}
