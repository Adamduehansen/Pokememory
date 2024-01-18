import { describe, it } from "$std/testing/bdd.ts";
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.212.0/testing/mock.ts";
import {
  cardReducer,
  CardState,
  FlipCardAction,
  ResetCardsAction,
  SetCardsAction,
} from "@lib/cardReducer.ts";
import { assertArrayIncludes, assertEquals } from "$std/assert/mod.ts";

describe("cardReducer", () => {
  describe("setCards action", () => {
    it("Should set the cards", () => {
      // Arrange
      const guid1: `${string}-${string}-${string}-${string}-${string}` =
        "1-1-1-1-1";
      const guid2: `${string}-${string}-${string}-${string}-${string}` =
        "2-2-2-2-2";
      const cryptoRandomUUIDStub = stub(
        crypto,
        "randomUUID",
        returnsNext([guid1, guid2]),
      );
      const currentState: CardState = {
        cards: [],
      };
      const expectedState: CardState = {
        cards: [
          {
            id: guid1,
            pokemonId: 2,
            facing: "backside",
            isFlipped: false,
            isMatched: false,
          },
          {
            id: guid2,
            pokemonId: 2,
            facing: "frontside",
            isFlipped: false,
            isMatched: false,
          },
        ],
      };
      const pokemonIds = [2];
      const action: SetCardsAction = {
        type: "setCards",
        payload: pokemonIds,
      };

      // Act
      const actualState = cardReducer(currentState, action);

      // Assert
      assertArrayIncludes(actualState.cards, expectedState.cards);

      cryptoRandomUUIDStub.restore();
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
