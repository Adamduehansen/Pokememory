import { JSX } from "preact/jsx-runtime";

type Props = JSX.HTMLAttributes<HTMLButtonElement> & {
  flipped: boolean;
  pokemonImageUrl: string;
};

export function Card(
  { flipped, pokemonImageUrl, ...rest }: Props,
): JSX.Element {
  const imageComponent = flipped === true
    ? <img src={pokemonImageUrl} alt="Pokemon" />
    : (
      <img
        src="/pokemon_card_back.gif"
        alt="Backside of a Pokemon Card, pixelated"
      />
    );

  return (
    <button {...rest}>
      {imageComponent}
    </button>
  );
}
