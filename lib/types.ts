import { number, object, Output, string } from "valibot";

export type Pokemon = {
  id: number;
};

export type SpriteFacing = "frontside" | "backside";

export type Card = {
  readonly id: string;
  readonly pokemonId: number;
  readonly facing: SpriteFacing;
  isFlipped: boolean;
  isMatched: boolean;
};

export const ScoreSchema = object({
  name: string(),
  score: number(),
});

export type Score = Output<typeof ScoreSchema>;
