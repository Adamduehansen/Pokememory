import { JSX } from "preact/jsx-runtime";
import { getScores } from "@lib/db.ts";
import { Scores } from "@components/Scores.tsx";

export default async function Scoreboard(): Promise<JSX.Element> {
  const scores = await getScores();

  return (
    <div>
      <h1>Highscores</h1>
      <Scores scores={scores} />
      <a href="/game">New game</a>
    </div>
  );
}
