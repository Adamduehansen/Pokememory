import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@components/Dialog.tsx";

type Props = {
  open: boolean;
  score: number;
};

export function GameOverDialog({ open, score }: Props): JSX.Element {
  return (
    <Dialog open={open}>
      <p>Game over!</p>
      <p>Your score is: {score}</p>
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
  );
}
