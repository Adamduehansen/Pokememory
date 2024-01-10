import { Pokemon } from "@lib/types.ts";

export function getPokemons(options: {
  amount: number;
}): Pokemon[] {
  const pokemons: Pokemon[] = [];
  for (let index = 1; index <= options.amount; index++) {
    pokemons.push({
      id: index,
    });
  }
  return pokemons;
}
