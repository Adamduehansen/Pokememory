import kctx from '@/lib/kctx';
import { Card, createGame } from '@/lib/game';
import { GameObj, PosComp } from 'kaboom';

type PokemonCardObj = GameObj<PosComp>;

interface PokemonCardPairs {
  [key: string]: Card[];
}

function createCard(options: {
  id: number;
  sprite: string;
  onCardSelect: (id: number) => void;
}): PokemonCardObj {
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
    onCardSelect(id);
  });

  return card;
}

function groupIntoPairs(group: PokemonCardPairs, card: Card): PokemonCardPairs {
  const { pokemonId } = card;
  group[pokemonId] = group[pokemonId] ?? [];
  group[pokemonId].push(card);
  return group;
}

function createCards(
  handleCardSelect: (id: number) => void
): (cards: Card[]) => PokemonCardObj[] {
  return ([firstCard, secondCard]): PokemonCardObj[] => {
    const frontCard = createCard({
      id: firstCard.id,
      sprite: `${firstCard.pokemonId}-front`,
      onCardSelect: handleCardSelect,
    });
    const backCard = createCard({
      id: secondCard.id,
      sprite: `${secondCard.pokemonId}-back`,
      onCardSelect: handleCardSelect,
    });
    return [frontCard, backCard];
  };
}

function gameScene(pokemonIds: number[]): void {
  const game = createGame({
    pokemonIds: pokemonIds,
  });

  function handleCardSelect(id: number) {
    game.select(id);
  }

  const cards = Object.values(
    game.getCards().reduce<PokemonCardPairs>(groupIntoPairs, {})
  )
    .map(createCards(handleCardSelect))
    .flat();

  cards.forEach((card, index) => {
    card.moveTo(100 * index + 100, 100);
  });
}

export default gameScene;
