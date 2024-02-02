import { Pokemon } from "@lib/types.ts";

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPokemons(options: {
  amount: number;
}): Pokemon[] {
  const pokemons: Pokemon[] = [];
  for (let index = 1; index <= options.amount; index++) {
    let pokemonId = getRandomNumber(1, 150);

    while (pokemons.some((pokemon) => pokemon.id === pokemonId)) {
      pokemonId = getRandomNumber(1, 150);
    }

    pokemons.push({
      id: pokemonId,
    });
  }
  return pokemons;
}
