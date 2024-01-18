import { Card, SpriteFacing } from "@lib/types.ts";
import { randomSort } from "@lib/utils.ts";

export type CardState = {
  cards: Card[];
};

export type SetCardsAction = {
  type: "setCards";
  payload: number[];
};

export type FlipCardAction = {
  type: "flipCard";
  payload: string;
};

export type ResetCardsAction = {
  type: "resetCards";
};

type Actions = FlipCardAction | ResetCardsAction | SetCardsAction;

function faceSelectedCardUp(
  cards: Card[],
  selectedCardId: string,
): Card[] {
  return cards.map((card) => {
    if (card.id !== selectedCardId) {
      return {
        ...card,
      };
    }
    return {
      ...card,
      isFlipped: true,
    };
  });
}

function getFlippedCards<T extends Card[]>(cards: T): Card[] {
  return cards.filter((card) =>
    card.isFlipped === true && card.isMatched == false
  );
}

function isSamePokemonId(card1: Card, card2: Card): boolean {
  return card1.pokemonId === card2.pokemonId;
}

function turnNotMatchedCardDown(cards: Card[]): Card[] {
  return cards.map((card): Card => {
    if (card.isMatched) {
      return {
        ...card,
      };
    }

    return {
      ...card,
      isFlipped: false,
    };
  });
}

function setMatchingCards(cards: Card[], card1: Card, card2: Card): Card[] {
  return cards.map((card): Card => {
    if (card.id !== card1.id && card.id !== card2.id) {
      return {
        ...card,
      };
    }
    return {
      ...card,
      isMatched: true,
    };
  });
}

function createCards(pokemonsIds: number[], facing: SpriteFacing): Card[] {
  return pokemonsIds.map((pokemonId): Card => {
    return {
      id: crypto.randomUUID(),
      pokemonId: pokemonId,
      facing: facing,
      isFlipped: false,
      isMatched: false,
    };
  });
}

export function cardReducer(state: CardState, action: Actions): CardState {
  switch (action.type) {
    case "setCards":
      return {
        cards: [
          ...createCards(action.payload, "backside"),
          ...createCards(action.payload, "frontside"),
        ].sort(randomSort),
      };
    case "flipCard": {
      let flippedCards = getFlippedCards(state.cards);
      if (flippedCards.length === 2) {
        return {
          ...state,
        };
      }

      const updatedCards = faceSelectedCardUp(state.cards, action.payload);
      flippedCards = getFlippedCards(updatedCards);

      if (flippedCards.length < 2) {
        return {
          cards: updatedCards,
        };
      }

      const [flippedCard1, flippedCard2] = flippedCards;
      if (!isSamePokemonId(flippedCard1, flippedCard2)) {
        return {
          cards: updatedCards,
        };
      }

      return {
        cards: setMatchingCards(updatedCards, flippedCard1, flippedCard2),
      };
    }
    case "resetCards": {
      const flippedCards = getFlippedCards(state.cards);
      if (flippedCards.length < 2) {
        return { ...state };
      }

      return {
        cards: turnNotMatchedCardDown(state.cards),
      };
    }
    default:
      return { ...state };
  }
}
