import { useEffect, useReducer } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Card, Pokemon, SpriteFacing } from "@lib/types.ts";
import { getPokemons } from "@services/PokemonService.ts";
import { randomSort } from "@lib/utils.ts";
import { CardGrid } from "@components/CardGrid.tsx";
import { cardReducer, CardState } from "@lib/cardReducer.ts";

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

const initialState: CardState = {
  cards: [],
};

export function GameBoard(): JSX.Element {
  const isLoaded = useSignal<boolean>(false);
  const [cardsState, dispatch] = useReducer(cardReducer, initialState);

  function flipCard() {
  }

  function resetCards(): void {
    dispatch({ type: "resetCards" });
  }

  useEffect(() => {
    const pokemons = getPokemons({
      amount: 2,
    });
    const cards = [
      ...createCards(pokemons, "backside"),
      ...createCards(pokemons, "frontside"),
    ].sort(
      randomSort,
    );
    console.log("Cards", cards);
    dispatch({
      type: "setCards",
      payload: cards,
    });
    isLoaded.value = true;
  }, []);

  if (isLoaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <div>
      <button onClick={resetCards}>Face Cards Down</button>
      <CardGrid
        cards={cardsState.cards}
        onCardSelected={flipCard}
      />
    </div>
  );
}
