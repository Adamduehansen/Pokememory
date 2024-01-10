export type Pokemon = {
  id: number;
};

export type SpriteFacing = "frontside" | "backside";

export type Card = {
  id: string;
  pokemonId: number;
  facing: SpriteFacing;
  isFlipped: boolean;
};
