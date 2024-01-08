import { JSX } from "preact/jsx-runtime";
import { GameGrid } from "@islands/GameGrid.tsx";

export default function Game(): JSX.Element {
  return (
    <div>
      <GameGrid />
    </div>
  );
}
