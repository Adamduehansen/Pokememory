export interface Pair {
  id: number;
  matched: boolean;
}

export type SelectResult = 'await' | 'match' | 'invalid' | 'matched';
export type GameState = 'idle' | 'await';

export interface Game {
  getSelectedId: () => number | undefined;
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
  let selectedId: number | undefined;
  let pairs = pokemonIds.map(createPair);
  let gameState: GameState = 'idle';
  return {
    getSelectedId: () => selectedId,
    getState: () => gameState,
    getPairs: () => pairs,
    select: function (id: number) {
      if (pairs.find((pair) => pair.id === id)?.matched) {
        return 'matched';
      }

      if (selectedId === undefined) {
        selectedId = id;
        gameState = 'await';
        return 'await';
      } else if (selectedId === id) {
        gameState = 'idle';
        pairs = pairs.map(setMatchInPair(id));
        selectedId = undefined;
        return 'match';
      }

      gameState = 'idle';
      return 'invalid';
    },
  };
}
