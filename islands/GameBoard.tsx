import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { getPokemons } from "@services/PokemonService.ts";
import { CardGrid } from "@components/CardGrid.tsx";
import { useCards } from "@hooks/useCards.ts";
import { Card } from "@lib/types.ts";
import { Dialog } from "@components/Dialog.tsx";

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
  const resetDialogRef = useRef<HTMLDialogElement>(null);
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
      amount: 2,
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
      <Dialog ref={resetDialogRef} open={hasTwoNonMatchedCardsFlipped}>
        <button
          onClick={onCardsReset}
        >
          Face Cards Down
        </button>
      </Dialog>
      <Dialog open={isAllCardsMatched(cards)}>
        <p>Game over!</p>
        <p>Your score is: {score.value}</p>
        <form>
          <fieldset>
            <legend>Submit your score</legend>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" placeholder="Enter your a name" autoFocus />
            </div>
            <button>Submit score</button>
          </fieldset>
        </form>
        <a href="/scoreboard">Go to scoreboard</a>
        <a href="/game">New game</a>
      </Dialog>
    </div>
  );
}
