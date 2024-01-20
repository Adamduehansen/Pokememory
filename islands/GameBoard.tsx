import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { getPokemons } from "@services/PokemonService.ts";
import { CardGrid } from "@components/CardGrid.tsx";
import { useCards } from "@hooks/useCards.ts";

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const { cards, flipCard, resetCards, setCards } = useCards([]);

  useEffect(() => {
    const pokemons = getPokemons({
      amount: 2,
    });
    setCards(pokemons.map((pokemon) => pokemon.id));
    isLoaded.value = true;
  }, []);

  if (isLoaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <div>
      <CardGrid
        cards={cards}
        onCardSelected={flipCard}
      />
      <button onClick={resetCards}>Face Cards Down</button>
    </div>
  );
}
