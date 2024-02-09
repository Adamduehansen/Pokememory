import { JSX } from "preact/jsx-runtime";
import classnames from "classnames";

type Props = JSX.HTMLAttributes<HTMLButtonElement> & {
  flipped: boolean;
  pokemonImageUrl: string;
  isMatched: boolean;
  isInvalid: boolean;
};

export function Card(
  { flipped, pokemonImageUrl, isMatched, isInvalid, ...rest }: Props,
): JSX.Element {
  return (
    <div class="flip-container">
      <button
        class={classnames("flip-button", {
          "flipped": flipped,
          "matched": isMatched,
          "invalid": isInvalid,
        })}
        {...rest}
      >
        <div class="front">
          <div className="pokeball"></div>
        </div>
        <div class="back">
          <img src={pokemonImageUrl} alt="Pokemon" />
        </div>
      </button>
    </div>
  );
}
