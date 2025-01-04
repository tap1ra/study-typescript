type Formatter<T> = T extends number
  ? (value: T) => string
  : T extends string
  ? (value: T) => string[]
  : never;

function formatValue<T>(value: T, formatter: Formatter<T>) {
  return formatter(value);
}

const formatNumber: Formatter<number> = (value) => `$${value.toFixed(2)}`;
const formatString: Formatter<string> = (value) => value.split(' ');

console.log(formatValue(123, formatNumber));
console.log(formatValue('Hello World', formatString));
