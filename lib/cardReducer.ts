import { Card } from "@lib/types.ts";

export type CardState = {
  cards: Card[];
};

export type SetCardsAction = {
  type: "setCards";
  payload: Card[];
};

export type FlipAction = {
  type: "flip";
  payload: string;
};

export type ResetAction = {
  type: "reset";
};

type Actions = FlipAction | ResetAction | SetCardsAction;

export function cardReducer(state: CardState, action: Actions): CardState {
  switch (action.type) {
    case "setCards":
      return {
        cards: action.payload,
      };
    case "flip":
      return { ...state };
    case "reset": {
      return { ...state };
      // const flippedCards = getFlippedCards(state.cards);
      // if (flippedCards.length < 2) {
      //   return { ...state };
      // }

      // return {
      //   cards: turnNotMatchedCardDown(state.cards),
      // };
    }
    default:
      return { ...state };
  }
}
