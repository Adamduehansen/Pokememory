import { Pokemon } from "../lib/types.ts";

export function getPokemons(): Pokemon[] {
  const pokemons: Pokemon[] = [];
  for (let index = 0; index < 4; index++) {
    pokemons.push({
      id: crypto.randomUUID(),
      pokemonId: index,
    });
  }
  return pokemons;
}
