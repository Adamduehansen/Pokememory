import { JSX } from "preact/jsx-runtime";
import { Card } from "@components/Card.tsx";
import { Pokemon } from "@lib/types.ts";

type Props = {
  grid: Pokemon[][];
  onCardSelected: (id: string) => void;
  selectedOption1: string | undefined;
  selectedOption2: string | undefined;
};

export function CardGrid(
  { grid, onCardSelected, selectedOption1, selectedOption2 }: Props,
): JSX.Element {
  return (
    <div>
      {grid.map((row): JSX.Element => {
        return (
          <div role="row">
            {row.map((pokemon): JSX.Element => {
              const isFlipped = pokemon.id === selectedOption1 ||
                pokemon.id === selectedOption2;

              return (
                <div role="cell">
                  <Card
                    flipped={isFlipped}
                    pokemonImageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`}
                    onClick={() => onCardSelected(pokemon.id)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
