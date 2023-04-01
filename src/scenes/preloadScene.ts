import { GetIdHandler, getRandomPokemonIds } from '@/lib/utils';
import kctx from '@/lib/kctx';
import scenes from '@/lib/scenes';

const { VITE_MAX_ID } = import.meta.env;

function loadSprite(pokemonId: number): void {
  kctx.loadSprite(`${pokemonId}-back`, `back/${pokemonId}.png`);
  kctx.loadSprite(`${pokemonId}-front`, `${pokemonId}.png`);
}

const getIdHandler: GetIdHandler = function () {
  return Math.floor(kctx.rand(1, parseInt(VITE_MAX_ID) + 1));
};

function preloadScene(): void {
  const numberOfPokemons = 6;
  if (numberOfPokemons > parseInt(VITE_MAX_ID)) {
    throw new Error(
      `numberOfPokemons: ${numberOfPokemons} cannot be larger than MAX_ID: ${VITE_MAX_ID}`
    );
  }

  const pokemonIds = getRandomPokemonIds(numberOfPokemons, getIdHandler);

  pokemonIds.forEach(loadSprite);
  kctx.go(scenes.game, pokemonIds);
}

export default preloadScene;
