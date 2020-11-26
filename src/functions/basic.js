export function calculate(operator, values) {
  return locals[operator](...values);
}

export const locals = {
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "=": (a, b) => a,
  Enter: (a, b) => a,
};
