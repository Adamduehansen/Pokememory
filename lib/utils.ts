export function sliceArray<T>(array: T[], size: number): T[][] {
  const chunkedArr: T[][] = [];
  let index = 0;

  while (index < array.length) {
    chunkedArr.push(array.slice(index, index + size));
    index += size;
  }

  return chunkedArr;
}

export function randomSort() {
  return Math.random() - 0.5;
}
