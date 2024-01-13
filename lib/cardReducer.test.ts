import { describe, it } from "$std/testing/bdd.ts";
import { cardReducer, CardState, SetCardsAction } from "@lib/cardReducer.ts";
import { Card } from "@lib/types.ts";
import { assertEquals } from "$std/assert/mod.ts";

describe("cardReducer", () => {
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
