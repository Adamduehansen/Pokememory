import kctx from '../lib/kctx';

function gameScene(pokemonIds: number[]): void {
  pokemonIds.forEach((pokemonId, index) => {
    kctx.add([
      kctx.sprite(`${pokemonId}-front`),
      kctx.pos(100, 100 * (index + 1)),
    ]);
    kctx.add([
      kctx.sprite(`${pokemonId}-back`),
      kctx.pos(200, 100 * (index + 1)),
    ]);
  });
}

export default gameScene;
