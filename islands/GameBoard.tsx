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
      isMatched: false,
    };
  });
}

type FlippedCard = Card & {
  isFlipped: true;
};

function getFlippedCards<T extends Card[]>(cards: T): FlippedCard[] {
  return cards.filter((card) => card.isFlipped) as FlippedCard[];
}

function faceCardsDownExceptTheSelected(
  cards: Card[],
  selectedCardId: string,
): Card[] {
  return cards.map((card) => {
    if (card.id !== selectedCardId) {
      return {
        ...card,
        isFlipped: false,
      };
    }
    return {
      ...card,
      isFlipped: true,
    };
  });
}

function faceSelectedCardUp(
  cards: Card[],
  selectedCardId: string,
): Card[] {
  return cards.map((card) => {
    if (card.id !== selectedCardId) {
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

function isSamePokemonId(card1: Card, card2: Card): boolean {
  return card1.pokemonId === card2.pokemonId;
}

function setMatchingCards(cards: Card[], card1: Card, card2: Card): Card[] {
  return cards.map((card): Card => {
    if (card.id !== card1.id && card.id !== card2.id) {
      return {
        ...card,
      };
    }
    return {
      ...card,
      isMatched: true,
    };
  });
}

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const cards = useSignal<Card[]>([]);

  function flipCard(selectedCardId: string) {
    console.log("Attempting to flip card", selectedCardId);

    cards.value = faceSelectedCardUp(cards.value, selectedCardId);
    const flippedCards = getFlippedCards(cards.value);

    if (flippedCards.length === 2) {
      const [flippedCard1, flippedCard2] = flippedCards;
      if (!isSamePokemonId(flippedCard1, flippedCard2)) {
        return;
      }

      cards.value = setMatchingCards(cards.value, flippedCard1, flippedCard2);
      console.log(cards.value);

      return;
    }

    if (flippedCards.length > 2) {
      cards.value = faceCardsDownExceptTheSelected(cards.value, selectedCardId);
    }
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
