import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@islands/Dialog.tsx";
import { ScoreForm } from "@islands/ScoreForm.tsx";
import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

type Props = {
  open: boolean;
  score: number;
};

export function GameOverDialog({ open, score }: Props): JSX.Element {
  const scoreLinkRef = useRef<HTMLAnchorElement>(null);
  const isSubmitted = useSignal(false);

  async function onScoreFormSubmit(name: string) {
    isSubmitted.value = true;
    const response = await fetch("/game", {
      method: "POST",
      body: JSON.stringify({ name: name, score: score }),
    });
    scoreLinkRef.current!.focus();
    console.log(response);
  }

  return (
    <Dialog open={open}>
      <p>Game over!</p>
      <p>Your score is: {score}</p>
      <div role="alert">
        {isSubmitted.value === true ? "Score submitted" : ""}
      </div>
      {isSubmitted.value === false && (
        <ScoreForm
          onScoreSubmit={onScoreFormSubmit}
        />
      )}
      <div>
        <a href="/scoreboard" ref={scoreLinkRef}>
          Go to scoreboard
        </a>
      </div>
      <div>
        <a href="/game">New game</a>
      </div>
    </Dialog>
  );
}
