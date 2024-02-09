import { JSX } from "preact/jsx-runtime";
import { Card } from "@components/Card.tsx";
import * as types from "@lib/types.ts";

type Props = {
  cards: types.Card[];
  onCardSelected: (id: string) => void;
};

function isFlippedNotMatchedCard(card: types.Card): boolean {
  return card.isFlipped && !card.isMatched;
}

function createPokemonUrl(
  pokemonNumber: number,
  facing: types.SpriteFacing,
): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${
    facing === "backside" ? "/back/" : "/"
  }${pokemonNumber}.png`;
}

export function CardGrid(
  { cards, onCardSelected }: Props,
): JSX.Element {
  function makeOnCardSelected(cardId: string) {
    return function () {
      onCardSelected(cardId);
    };
  }

  const hasTwoNonMatchedCardsFlipped =
    cards.filter(isFlippedNotMatchedCard).length === 2;

  return (
    <div class="card-grid">
      {cards.map((card, index): JSX.Element => {
        return (
          <div class="card-grid__item">
            <Card
              flipped={card.isFlipped || card.isMatched}
              pokemonImageUrl={createPokemonUrl(card.pokemonId, card.facing)}
              onClick={makeOnCardSelected(card.id)}
              disabled={card.isMatched || card.isFlipped}
              aria-label={`Card ${index.toString()}`}
              isMatched={card.isMatched}
              isInvalid={card.isFlipped && !card.isMatched &&
                hasTwoNonMatchedCardsFlipped}
            />
          </div>
        );
      })}
    </div>
  );
}
