import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { getPokemons } from "@services/PokemonService.ts";
import { CardGrid } from "@components/CardGrid.tsx";
import { useCards } from "@hooks/useCards.ts";
import { Card } from "@lib/types.ts";
import { ResetCardsDialog } from "./ResetCardsDialog.tsx";
import { GameOverDialog } from "@islands/GameOverDialog.tsx";

function isMatchedCard(card: Card): boolean {
  return card.isMatched === true;
}

function isAllCardsMatched(cards: Card[]): boolean {
  return cards.length > 0 && cards.every(isMatchedCard);
}

function isFlippedNotMatchedCard(card: Card): boolean {
  return card.isFlipped && !card.isMatched;
}

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const score = useSignal<number>(0);
  const { cards, flipCard, resetCards, setCards } = useCards([]);

  const hasTwoNonMatchedCardsFlipped =
    cards.filter(isFlippedNotMatchedCard).length === 2;

  function onCardSelected(id: string): void {
    flipCard(id);
    score.value += 25;
  }

  function onCardsReset(): void {
    resetCards();
    score.value -= 25;
  }

  useEffect(() => {
    const pokemons = getPokemons({
      amount: 6,
    });
    setCards(pokemons.map((pokemon) => pokemon.id));
    isLoaded.value = true;
  }, []);

  if (isLoaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <div class="game-board">
      <p>Score {score.value}</p>
      <CardGrid
        cards={cards}
        onCardSelected={onCardSelected}
      />
      <ResetCardsDialog
        open={hasTwoNonMatchedCardsFlipped}
        onReset={onCardsReset}
      />
      <GameOverDialog open={isAllCardsMatched(cards)} score={score.value} />
    </div>
  );
}
