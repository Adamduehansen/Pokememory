import { JSX } from "preact/jsx-runtime";
import { Card } from "@components/Card.tsx";
import * as types from "@lib/types.ts";

type Props = {
  cards: types.Card[];
  onCardSelected: (id: string) => void;
};

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

  return (
    <div class="card-grid">
      {cards.map((card): JSX.Element => {
        console.log(card);

        return (
          <div class="card-grid__item">
            <Card
              flipped={card.isFlipped || card.isMatched}
              pokemonImageUrl={createPokemonUrl(card.pokemonId, card.facing)}
              onClick={makeOnCardSelected(card.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
