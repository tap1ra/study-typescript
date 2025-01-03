// ログデコレーター
function LogDescorator(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`propertyKey: ${propertyKey}`);
    console.log(`args: ${args}`);

    const result = originalMethod.apply(this, args);
    console.log(`result: ${result}`);
    return result;
  };
}

// キャッシュデコレーター
function CacheDecorator(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void {
  const originalMethod = descriptor.value;
  const cacheMap = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const cacheKey = JSON.stringify(args);
    if (cacheMap.has(cacheKey)) {
      console.log(`Cache hit.`);
      return cacheMap.get(cacheKey);
    }

    console.log(`Cache miss.`);
    const result = originalMethod.apply(this, args);
    cacheMap.set(cacheKey, result);
    return result;
  };
}


class Calculator {
  @LogDescorator
  add(a: number, b: number): number {
    return a + b;
  }

  @LogDescorator
  subtract(a: number, b: number): number {
    return a - b;
  }

  @CacheDecorator
  division(a: number, b: number): number {
    return a / b;
  }

  
  @LogDescorator
  @CacheDecorator
  multiplication(a: number, b: number): number {
    return a * b;
  }
}

const calculator = new Calculator();
calculator.add(5, 3);

calculator.subtract(10, 4);

console.log('division(1, 1) first time.')
calculator.division(1, 1);
console.log('division(1, 1) second time.')
calculator.division(1, 1);
console.log('division(1, 1) third time.')
calculator.division(1, 1);

console.log('multiplication(999, 9999) first time.')
calculator.multiplication(999, 9999);
console.log('multiplication(999, 9999) second time.')
calculator.multiplication(999, 9999);
console.log('multiplication(999, 9999) third time.')
calculator.multiplication(999, 9999);