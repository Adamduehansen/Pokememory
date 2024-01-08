import { cleanup, render, setup } from "$fresh-testing-library/components.ts";
import { expect } from "$fresh-testing-library/expect.ts";
import { afterEach, beforeAll, describe, it } from "$std/testing/bdd.ts";
import { Card } from "@components/Card.tsx";

describe("components/Card", () => {
  beforeAll(setup);
  afterEach(cleanup);

  it("Should show back of card as default", () => {
    // Arrange
    const screen = render(
      <Card flipped={false} pokemonImageUrl="/pokemon-url" />,
    );

    // Act
    const image = screen.getByRole("img");

    // Assert
    expect(image).toHaveAttribute("src", "/pokemon_card_back.gif");
  });

  it("Should show pokemon when flipped", () => {
    // Arrange
    const screen = render(
      <Card flipped={true} pokemonImageUrl="/pokemon-url" />,
    );

    // Act
    const image = screen.getByRole("img");

    // Assert
    expect(image).toHaveAttribute("src", "/pokemon-url");
  });
});
