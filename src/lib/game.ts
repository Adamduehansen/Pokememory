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

export function createGame(options: { pokemonIds: number[] }): Game {
  const { pokemonIds } = options;
  let selectedId: number;
  let pairs = pokemonIds.map((pokemonId): Pair => {
    return {
      id: pokemonId,
      matched: false,
    };
  });
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
        return 'match';
      }

      gameState = 'idle';
      return 'invalid';
    },
  };
}
