import Calculator from './calculator.js'
const app = new Calculator()

app.debug();

app.totalizator.memory.store(11, "+");
app.memory.store(12, "+");
console.log(app.memory.recall());

console.log(app.totalizator.answer)
