import { Vec2 } from 'kaboom';
import kctx from '../lib/kctx';

function createCard(options: { sprite: string; pos: Vec2 }) {
  const { pos, sprite } = options;
  const card = kctx.add([
    kctx.sprite('card', {
      width: 96,
      frame: 0,
    }),
    kctx.area(),
    kctx.pos(pos),
    kctx.anchor('center'),
  ]);
  card.onHover(() => {
    kctx.setCursor('pointer');
    card.frame = 1;
  });
  card.onHoverEnd(() => {
    kctx.setCursor('auto');
    card.frame = 0;
  });

  const pokemon = kctx.add([
    kctx.sprite(sprite, {
      width: 180,
    }),
    kctx.pos(pos),
    kctx.anchor('center'),
  ]);
  pokemon.hidden = true;

  card.onClick(() => {
    card.hidden = !card.hidden;
    pokemon.hidden = !pokemon.hidden;
  });
}

function gameScene(pokemonIds: number[]): void {
  pokemonIds.forEach((pokemonId, index) => {
    createCard({
      sprite: `${pokemonId}-front`,
      pos: kctx.vec2(100 + index * 150, 100),
    });
    createCard({
      sprite: `${pokemonId}-back`,
      pos: kctx.vec2(100 + index * 150, 300),
    });
  });
}

export default gameScene;
