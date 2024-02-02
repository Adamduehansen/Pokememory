import { Handlers } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { GameBoard } from "@islands/GameBoard.tsx";
import { parse } from "valibot";
import { scoreSchema } from "@lib/types.ts";
import { db } from "@lib/db.ts";

export const handler: Handlers = {
  POST: async function (req, ctx) {
    const json = await req.json();
    const score = parse(scoreSchema, json);
    const scoreId = crypto.randomUUID();

    const result = await db.atomic().set(["score", scoreId], score).commit();

    if (result.ok === false) {
      return new Response(null, {
        status: 500,
      });
    }

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
