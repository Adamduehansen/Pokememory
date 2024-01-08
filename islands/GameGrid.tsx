import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Pokemon } from "../lib/types.ts";
import { CardButton } from "../components/CardButton.tsx";
import { getPokemons } from "../services/PokemonService.ts";
import { randomSort, sliceArray } from "../lib/utils.ts";

export function GameGrid(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const pokemonGrid = useSignal<Pokemon[][]>([]);
  const selectedOption1 = useSignal<string | undefined>(undefined);
  const selectedOption2 = useSignal<string | undefined>(undefined);

  function makeFlipCard(cardId: string): () => void {
    return function () {
      console.log("Flipping card:", cardId);
    };
  }

  useEffect(() => {
    const pokemons = getPokemons().sort(randomSort);
    pokemonGrid.value = sliceArray(pokemons, 2);

    isLoaded.value = true;
  }, []);

  if (isLoaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <div role="grid">
      <div role="rowgroup">
        {pokemonGrid.value.map((row): JSX.Element => {
          return (
            <div role="row">
              {row.map((card, index): JSX.Element => {
                return (
                  <div>
                    <CardButton
                      flipped={false}
                      pokemonImageUrl=""
                      onClick={makeFlipCard(card.id)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
