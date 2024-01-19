import { Card } from "@lib/types.ts";
import { useReducer } from "preact/hooks";
import { cardReducer } from "@lib/cardReducer.ts";

export function useCards(defaultCards: Card[]) {
  const [cardsState, dispatch] = useReducer(cardReducer, {
    cards: defaultCards,
  });

  function flipCard(id: string): void {
    dispatch({
      type: "flipCard",
      payload: id,
    });
  }

  function resetCards(): void {
    dispatch({ type: "resetCards" });
  }

  function setCards(pokemonIds: number[]): void {
    dispatch({
      type: "setCards",
      payload: pokemonIds,
    });
  }

  return {
    cards: cardsState.cards,
    flipCard: flipCard,
    resetCards: resetCards,
    setCards: setCards,
  };
}
