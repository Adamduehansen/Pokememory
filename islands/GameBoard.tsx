import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Card, Pokemon, SpriteFacing } from "@lib/types.ts";
import { getPokemons } from "@services/PokemonService.ts";
import { randomSort } from "@lib/utils.ts";
import { CardGrid } from "@components/CardGrid.tsx";

function createCards(pokemons: Pokemon[], facing: SpriteFacing): Card[] {
  return pokemons.map((pokemon): Card => {
    return {
      id: crypto.randomUUID(),
      pokemonId: pokemon.id,
      facing: facing,
      isFlipped: false,
    };
  });
}

type FlippedCard = Card & {
  isFlipped: true;
};

function getFlippedCards<T extends Card[]>(cards: T): FlippedCard[] {
  return cards.filter((card) => card.isFlipped) as FlippedCard[];
}

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const cards = useSignal<Card[]>([]);

  function flipCard(cardId: string) {
    console.log("Attempting to flip card", cardId);

    const flippedCards = getFlippedCards(cards.value);
    if (flippedCards.length >= 2) {
      cards.value = cards.value.map((card) => {
        return {
          ...card,
          isFlipped: false,
        };
      });
    }

    cards.value = cards.value.map((card) => {
      if (card.id !== cardId) {
        return {
          ...card,
        };
      }
      return {
        ...card,
        isFlipped: true,
      };
    });
  }

  useEffect(() => {
    const pokemons = getPokemons({
      amount: 2,
    });
    cards.value = [
      ...createCards(pokemons, "backside"),
      ...createCards(pokemons, "frontside"),
    ].sort(
      randomSort,
    );
    console.log("Cards", cards.value);
    isLoaded.value = true;
  }, []);

  if (isLoaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <CardGrid
      cards={cards.value}
      onCardSelected={flipCard}
    />
  );
}
