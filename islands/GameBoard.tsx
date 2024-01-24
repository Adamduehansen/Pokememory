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

function isAllMatched(cards: Card[]): boolean {
  return cards.length > 0 && cards.every(isMatchedCard);
}

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const resetDialogRef = useRef<HTMLDialogElement>(null);
  const { cards, flipCard, resetCards, setCards } = useCards([]);

  const hasTwoNonMatchedCardsFlipped =
    cards.filter((card) => card.isFlipped && !card.isMatched).length === 2;
  const allMatched = isAllMatched(cards);

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
      <CardGrid
        cards={cards}
        onCardSelected={flipCard}
      />
      <Dialog ref={resetDialogRef} open={hasTwoNonMatchedCardsFlipped}>
        <button
          onClick={resetCards}
        >
          Face Cards Down
        </button>
      </Dialog>
      <Dialog open={allMatched}>
        <p>Game over!</p>
        <p>Your score:</p>
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
