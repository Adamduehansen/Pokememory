export type GetIdHandler = () => number;

function makePokemonIdReducer(
  getIdHandler: GetIdHandler
): (listOfIds: number[]) => number[] {
  return function (listOfIds: number[]) {
    let randomId;
    while (!randomId || listOfIds.includes(randomId)) {
      randomId = getIdHandler();
    }
    return [...listOfIds, randomId];
  };
}

export function getRandomPokemonIds(
  size: number,
  getIdHandler: GetIdHandler
): number[] {
  return [...Array(size)].reduce<number[]>(
    makePokemonIdReducer(getIdHandler),
    []
  );
}
