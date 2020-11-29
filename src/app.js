import { totalizator, input, memory, ui } from "./lib/index.js";

export default class App {
  constructor() {}

  debug() {
    console.log("debug", this);
    return this;
  }
}

export class Calculator extends App {
  constructor() {
    super();
    this.input = input();
    this.memory = memory();
    this.totalizator = totalizator();
    this.ui = ui();

    return this;
  }
}

const app = new Calculator();
app.debug();

app.totalizator.memory.store(11, "+");
app.memory.store(12, "+");
console.log(app.memory.recall());

console.log(app.totalizator.answer)
