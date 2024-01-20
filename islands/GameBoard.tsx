import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { getPokemons } from "@services/PokemonService.ts";
import { CardGrid } from "@components/CardGrid.tsx";
import { useCards } from "@hooks/useCards.ts";
import { Card } from "@lib/types.ts";

function isMatchedCard(card: Card): boolean {
  return card.isMatched === true;
}

function isAllMatched(cards: Card[]): boolean {
  return cards.length > 0 && cards.every(isMatchedCard);
}

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

  useEffect(() => {
    if (isAllMatched(cards)) {
      console.log("Done");
    }
  }, [cards]);

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
