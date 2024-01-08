import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Pokemon } from "@lib/types.ts";
import { getPokemons } from "@services/PokemonService.ts";
import { randomSort, sliceArray } from "@lib/utils.ts";
import { CardGrid } from "@components/CardGrid.tsx";

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const pokemonGrid = useSignal<Pokemon[][]>([]);
  const selectedOption1 = useSignal<string | undefined>(undefined);
  const selectedOption2 = useSignal<string | undefined>(undefined);

  function flipCard(cardId: string) {
    console.log("Flipping card:", cardId);
    if (selectedOption1.value === undefined) {
      selectedOption1.value = cardId;
      return;
    }

    if (selectedOption2.value === undefined) {
      selectedOption2.value = cardId;
    }
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
    <CardGrid
      grid={pokemonGrid.value}
      onCardSelected={flipCard}
      selectedOption1={selectedOption1.value}
      selectedOption2={selectedOption2.value}
    />
  );
}
