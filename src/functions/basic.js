export const operators = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "=": (a, b) => a,
  Enter: (a, b) => a,
};

export function arithmetic(operator, values) {
  return operators[operator](...values);
}
