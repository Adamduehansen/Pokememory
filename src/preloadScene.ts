import kctx from './kctx';
import scenes from './scenes';

function getRandomPokemonIds(size: number): number[] {
  return [...Array(size)].map(() => {
    return Math.floor(kctx.rand(1, 150));
  });
}

function loadSprite(pokemonId: number): void {
  kctx.loadSprite(`${pokemonId}-back`, `back/${pokemonId}.png`);
  kctx.loadSprite(`${pokemonId}-front`, `${pokemonId}.png`);
}

function preloadScene(): void {
  const pokemonIds = getRandomPokemonIds(4);
  pokemonIds.forEach(loadSprite);

  kctx.go(scenes.game, pokemonIds);
}

export default preloadScene;
