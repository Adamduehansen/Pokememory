import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@components/Dialog.tsx";
import { useEffect, useRef } from "preact/hooks";

type Props = {
  open: boolean;
  score: number;
};

export function GameOverDialog({ open, score }: Props): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open === false) {
      return;
    }
    nameInputRef.current!.focus();
  }, [open]);

  return (
    <Dialog open={open}>
      <p>Game over!</p>
      <p>Your score is: {score}</p>
      <form>
        <fieldset>
          <legend>Submit your score</legend>
          <div>
            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              ref={nameInputRef}
              type="text"
              placeholder="Enter your a name"
            />
          </div>
          <button>Submit score</button>
        </fieldset>
      </form>
      <a href="/scoreboard">Go to scoreboard</a>
      <a href="/game">New game</a>
    </Dialog>
  );
}
