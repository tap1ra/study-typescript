function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: 'tap1ra',
};

const hoge = getValue(user, 'name');
console.log(typeof hoge); // string
const fuga = getValue(user, 'id');
console.log(typeof fuga); // number