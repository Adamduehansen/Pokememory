import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

export type Props = {
  onScoreSubmit: (name: string) => void;
  hidden: boolean;
};

export function ScoreForm({ onScoreSubmit, hidden }: Props): JSX.Element {
  const name = useSignal("");

  const onSubmit: JSX.GenericEventHandler<HTMLFormElement> = function (event) {
    event.preventDefault();

    if (name.value === "") {
      return;
    }

    onScoreSubmit(name.value);

    name.value = "";
  };

  return (
    <form onSubmit={onSubmit} hidden={hidden}>
      <fieldset>
        <legend>Submit your score!</legend>
        <div>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            placeholder="Enter your a name"
            value={name.value}
            onInput={(event) => {
              name.value = event.currentTarget.value;
            }}
          />
        </div>
        <button>Submit score</button>
      </fieldset>
    </form>
  );
}
