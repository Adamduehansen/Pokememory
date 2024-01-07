import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useSignal } from "@preact/signals";
import { Card } from "../lib/types.ts";
import { CardButton } from "../components/CardButton.tsx";

export function GameGrid(): JSX.Element {
  const loaded = useSignal<boolean>(false);
  const cards = useSignal<Card[][]>([]);

  useEffect(() => {
    loaded.value = true;
    cards.value = [
      [
        {
          id: crypto.randomUUID(),
          pokemonId: 1,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 2,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 3,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 4,
        },
      ],
      [
        {
          id: crypto.randomUUID(),
          pokemonId: 1,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 2,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 3,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 4,
        },
      ],
      [
        {
          id: crypto.randomUUID(),
          pokemonId: 5,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 5,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 6,
        },
        {
          id: crypto.randomUUID(),
          pokemonId: 6,
        },
      ],
    ];
  }, []);

  function makeFlipCard(cardId: string): () => void {
    return function () {
      console.log("Flipping card:", cardId);
    };
  }

  if (loaded.value === false) {
    return <>Loading game...</>;
  }

  return (
    <table role="grid">
      <tbody role="rowgroup">
        {cards.value.map((row): JSX.Element => {
          return (
            <tr role="row">
              {row.map((card, index): JSX.Element => {
                return (
                  <td>
                    <CardButton
                      flipped={false}
                      pokemonImageUrl=""
                      onClick={makeFlipCard(card.id)}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
