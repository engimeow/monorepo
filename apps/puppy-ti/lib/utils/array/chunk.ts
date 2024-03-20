export function chunk<T>(arr: Array<T>, size: number) {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    [] as Array<Array<T>>,
  );
}
