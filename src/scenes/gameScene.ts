import kctx from '@/lib/kctx';
import { createGame, Pair } from '@/lib/game';
import { GameObj, PosComp } from 'kaboom';

type PokemonCardObj = GameObj<PosComp>;

function createCard(options: {
  id: number;
  sprite: string;
  onCardSelect: (id: number) => void;
}) {
  const { id, sprite, onCardSelect } = options;
  const card = kctx.add([
    kctx.sprite('card', {
      width: 96,
      frame: 0,
    }),
    kctx.area(),
    kctx.pos(),
    kctx.anchor('center'),
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

  const pokemon = card.add([
    kctx.sprite(sprite, {
      width: 180,
    }),
    kctx.anchor('center'),
  ]);
  pokemon.hidden = true;

  card.onClick(() => {
    pokemon.hidden = !pokemon.hidden;
    onCardSelect(id);
  });

  return card;
}

function mapPairToCards(
  selectCardHandler: (id: number) => void
): (pair: Pair) => PokemonCardObj[] {
  return function ({ id }: Pair): PokemonCardObj[] {
    const frontSpriteCard = createCard({
      id: id,
      sprite: `${id}-front`,
      onCardSelect: selectCardHandler,
    });

    const backSpriteCard = createCard({
      id: id,
      sprite: `${id}-back`,
      onCardSelect: selectCardHandler,
    });

    return [frontSpriteCard, backSpriteCard];
  };
}

function gameScene(pokemonIds: number[]): void {
  const game = createGame({
    pokemonIds: pokemonIds,
  });

  function handleCardSelect(id: number) {
    const result = game.select(id);
    console.log(result);
  }

  const cards: PokemonCardObj[] = game
    .getPairs()
    .map(mapPairToCards(handleCardSelect))
    .flat();

  cards.forEach((card, index) => {
    card.moveTo(100 * index + 100, 100);
  });
}

export default gameScene;
