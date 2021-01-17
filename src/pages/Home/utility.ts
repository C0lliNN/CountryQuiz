import { Country } from '../../shared/interfaces/country';

function isCountry(obj: any): obj is Country {
  return obj && (obj as Country).flag !== undefined;
}

export default function getRandomElements<T>(array: T[], n: number): T[] {
  const clonedArray = [...array];
  const results: T[] = [];

  let i = 0;
  while (i < n) {
    const removedItem = clonedArray
      .splice(Math.floor(Math.random() * array.length), 1)
      .pop() as T;
    if (!removedItem || (isCountry(removedItem) && !removedItem.capital)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    results.push(removedItem);
    i += 1;
  }

  return results;
}
