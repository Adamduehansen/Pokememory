export type CardFace = 'upside' | 'downside';

export interface Card {
  id: number;
  pokemonId: number;
  matched: boolean;
  face: CardFace;
}

export type GameState = 'idle' | 'await' | 'reset';

interface SelectedCards {
  first?: number;
  second?: number;
}

export interface Game {
  getCards: () => Card[];
  getSelectedCards: () => SelectedCards;
  getState: () => GameState;
  select: (id: number) => void;
  reset: () => void;
}

function reduceIdsToCard(listOfCards: Card[], pokemonId: number): Card[] {
  const currentMaxId =
    listOfCards.length === 0
      ? 0
      : Math.max(...listOfCards.map((card) => card.id + 1));

  return [
    ...listOfCards,
    {
      id: currentMaxId,
      pokemonId: pokemonId,
      matched: false,
      face: 'downside',
    },
    {
      id: currentMaxId + 1,
      pokemonId: pokemonId,
      matched: false,
      face: 'downside',
    },
  ];
}

export function createGame(options: { pokemonIds: number[] }): Game {
  const { pokemonIds } = options;
  let cards = pokemonIds.reduce(reduceIdsToCard, []);

  const selectedCards: SelectedCards = {
    first: undefined,
    second: undefined,
  };

  let gameState: GameState = 'idle';

  return {
    getCards: () => cards,
    getSelectedCards: () => selectedCards,
    getState: () => gameState,
    select: function (id: number): void {
      const selectedCard = cards.find((card) => card.id === id);

      if (selectedCard === undefined) {
        throw new Error('Could not find card');
      }

      if (gameState === 'reset') {
        return;
      }

      if (selectedCards.first === undefined || selectedCards.first === id) {
        gameState = 'await';
        selectedCards.first = id;
        selectedCard.face = 'upside';
        return;
      } else {
        selectedCards.second = id;
        selectedCard.face = 'upside';
        gameState = 'reset';
      }

      const firstCard = cards.find((card) => card.id === selectedCards.first)!;
      const secondCard = cards.find(
        (card) => card.id === selectedCards.second
      )!;

      if (firstCard.pokemonId === secondCard.pokemonId) {
        cards = cards.map((card): Card => {
          if (card.id !== firstCard.id && card.id !== secondCard.id) {
            return card;
          }

          return {
            ...card,
            matched: true,
          };
        });
      }

      return;
    },
    reset: function () {
      if (
        selectedCards.first !== undefined &&
        selectedCards.second === undefined
      ) {
        return;
      }

      selectedCards.first = undefined;
      selectedCards.second = undefined;
      gameState = 'idle';

      cards = cards.map((card): Card => {
        return {
          ...card,
          face: card.matched ? 'upside' : 'downside',
        };
      });
    },
  };
}
