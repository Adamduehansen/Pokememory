import { JSX } from "preact/jsx-runtime";
import classnames from "classnames";

type Props = JSX.HTMLAttributes<HTMLButtonElement> & {
  flipped: boolean;
  pokemonImageUrl: string;
};

export function Card(
  { flipped, pokemonImageUrl, ...rest }: Props,
): JSX.Element {
  return (
    <div class="flip-container">
      <button
        class={classnames("flip-button", {
          "flipped": flipped,
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
