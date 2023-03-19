export interface Pair {
  id: number;
  matched: boolean;
}

export type SelectResult = 'await' | 'match' | 'invalid';
export type GameState = 'idle' | 'await';

export interface Game {
  getPairs: () => Pair[];
  getState: () => GameState;
  select: (id: number) => SelectResult;
}

function createPair(pokemonId: number): Pair {
  return {
    id: pokemonId,
    matched: false,
  };
}

function setMatchInPair(id: number): (pair: Pair) => Pair {
  return function (pair): Pair {
    if (pair.id !== id) {
      return pair;
    }
    return {
      ...pair,
      matched: true,
    };
  };
}

export function createGame(options: { pokemonIds: number[] }): Game {
  const { pokemonIds } = options;
  let selectedId: number;
  let pairs = pokemonIds.map(createPair);
  let gameState: GameState = 'idle';
  return {
    getState: () => gameState,
    getPairs: () => pairs,
    select: function (id: number) {
      if (selectedId === undefined) {
        selectedId = id;
        gameState = 'await';
        return 'await';
      } else if (selectedId === id) {
        gameState = 'idle';
        pairs = pairs.map(setMatchInPair(id));
        return 'match';
      }

      gameState = 'idle';
      return 'invalid';
    },
  };
}
