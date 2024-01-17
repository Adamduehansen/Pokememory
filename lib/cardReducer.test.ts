import { describe, it } from "$std/testing/bdd.ts";
import {
  cardReducer,
  CardState,
  FlipCardAction,
  ResetCardsAction,
  SetCardsAction,
} from "@lib/cardReducer.ts";
import { Card } from "@lib/types.ts";
import { assertEquals } from "$std/assert/mod.ts";

describe("cardReducer", () => {
  describe("setCards action", () => {
    it("Should set the cards", () => {
      // Arrange
      const currentState: CardState = {
        cards: [],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 2,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
        ],
      };
      const cards: Card[] = [{
        id: "1",
        pokemonId: 2,
        facing: "backside",
        isFlipped: false,
        isMatched: false,
      }];
      const action: SetCardsAction = {
        type: "setCards",
        payload: cards,
      };

      // Act
      const actualState = cardReducer(currentState, action);

      // Assert
      assertEquals(actualState, expectedState);
    });
  });

  describe("flipCard action", () => {
    it("Should flip a card", () => {
      // Arrange
      const currentState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
        ],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const flipCardAction: FlipCardAction = {
        type: "flipCard",
        payload: "2",
      };

      // Act
      const actualState = cardReducer(currentState, flipCardAction);

      // Assert
      assertEquals(actualState, expectedState);
    });

    it("Should set isMatched to true if flipped cards have same pokemon id", () => {
      // Arrange
      const currentState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: true,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
        ],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: true,
            isMatched: true,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: true,
            isMatched: true,
          },
        ],
      };

      const flipCardAction: FlipCardAction = {
        type: "flipCard",
        payload: "2",
      };

      // Act
      const actualState = cardReducer(currentState, flipCardAction);

      // Assert
      assertEquals(actualState, expectedState);
    });

    it("Should not flip card if there are already two flipped cards", () => {
      // Arrange
      const currentState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: true,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: true,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const flipCardAction: FlipCardAction = {
        type: "flipCard",
        payload: "2",
      };

      // Act
      const actualState = cardReducer(currentState, flipCardAction);

      // Assert
      assertEquals(actualState, expectedState);
    });
  });

  describe("reset action", () => {
    it("should face all not matched cards down in state", () => {
      // Arrange
      const currentState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: true,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
        ],
      };
      const resetCardsAction: ResetCardsAction = {
        type: "resetCards",
      };

      // Act
      const actualState = cardReducer(currentState, resetCardsAction);

      // Assert
      assertEquals(actualState, expectedState);
    });

    it("should not reset when only one card is flipped in state", () => {
      // Arrange
      const currentState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: "1",
            pokemonId: 1,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "2",
            pokemonId: 1,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: "3",
            pokemonId: 2,
            facing: "backside",
            isFlipped: true,
            isMatched: false,
          },
        ],
      };
      const resetCardsAction: ResetCardsAction = {
        type: "resetCards",
      };

      // Act
      const actualState = cardReducer(currentState, resetCardsAction);

      // Assert
      assertEquals(actualState, expectedState);
    });
  });
});
