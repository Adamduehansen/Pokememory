import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

type Props = {
  onScoreSubmit: (name: string) => void;
};

export function ScoreForm(props: Props): JSX.Element {
  const name = useSignal("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (name.value === "") {
          return;
        }

        props.onScoreSubmit(name.value);

        name.value = "";
      }}
    >
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
