const localFunctions = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "=": (a, b) => a,
  Enter: (a, b) => a,
};

export default function useFunction(operator, callback) {
  console.log("op", operator);
  console.log("func: ", localFunctions[operator]);
  callback(localFunctions[operator]);
}
