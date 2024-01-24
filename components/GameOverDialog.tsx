import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@components/Dialog.tsx";
import { ScoreForm } from "@components/ScoreForm.tsx";

type Props = {
  open: boolean;
  score: number;
};

export function GameOverDialog({ open, score }: Props): JSX.Element {
  function onScoreFormSubmit(name: string) {
    console.log(name);
  }

  return (
    <Dialog open={open}>
      <p>Game over!</p>
      <p>Your score is: {score}</p>
      <ScoreForm onScoreSubmit={onScoreFormSubmit} />
      <div>
        <a href="/scoreboard">Go to scoreboard</a>
      </div>
      <div>
        <a href="/game">New game</a>
      </div>
    </Dialog>
  );
}
