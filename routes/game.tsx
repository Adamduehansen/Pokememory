import { Handlers } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { GameBoard } from "@islands/GameBoard.tsx";

export const handler: Handlers = {
  POST: async function (req, ctx) {
    const score = await req.json();
    console.log(score);

    return new Response(null, {
      status: 201,
    });
  },
};

export default function Game(): JSX.Element {
  return (
    <div>
      <GameBoard />
    </div>
  );
}
