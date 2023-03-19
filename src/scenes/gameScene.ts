import { Vec2 } from 'kaboom';
import { selectable } from '@/components/SelectableComp';
import kctx from '@/lib/kctx';

function createCard(options: {
  id: number;
  sprite: string;
  pos: Vec2;
  onCardSelect: (id: number) => void;
}) {
  const { id, pos, sprite, onCardSelect } = options;
  const card = kctx.add([
    kctx.sprite('card', {
      width: 96,
      frame: 0,
    }),
    kctx.area(),
    kctx.pos(pos),
    kctx.anchor('center'),
    selectable(),
    'card',
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
    card.selected = !card.selected;
    pokemon.hidden = !pokemon.hidden;

    if (!card.selected) {
      return;
    }

    onCardSelect(id);
  });
}

function gameScene(pokemonIds: number[]): void {
  function handleCardSelect(id: number) {
    console.log(id);
  }

  pokemonIds.forEach((pokemonId, index) => {
    createCard({
      id: pokemonId,
      sprite: `${pokemonId}-front`,
      pos: kctx.vec2(100 + index * 150, 100),
      onCardSelect: handleCardSelect,
    });
    createCard({
      id: pokemonId,
      sprite: `${pokemonId}-back`,
      pos: kctx.vec2(100 + index * 150, 300),
      onCardSelect: handleCardSelect,
    });
  });
}

export default gameScene;
