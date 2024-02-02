import { Score } from "@lib/types.ts";

export const db = await Deno.openKv();

function listScores() {
  return db.list<Score>({
    prefix: ["score"],
  });
}

export async function getScores() {
  const scores: Score[] = [];
  for await (const iterator of listScores()) {
    scores.push(iterator.value);
  }
  return scores;
}
