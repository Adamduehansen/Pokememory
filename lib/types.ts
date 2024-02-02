import { number, object, string } from "valibot";

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

export const scoreSchema = object({
  name: string(),
  score: number(),
});
