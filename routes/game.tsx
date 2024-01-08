import { JSX } from "preact/jsx-runtime";
import { GameBoard } from "@islands/GameBoard.tsx";

export default function Game(): JSX.Element {
  return (
    <div>
      <GameBoard />
    </div>
  );
}
