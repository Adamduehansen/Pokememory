import kctx from '@/lib/kctx';
import { Card, createGame } from '@/lib/game';
import { GameObj, PosComp } from 'kaboom';

interface CardComp {
  cardId: number;
}

type PokemonCardObj = GameObj<PosComp | CardComp>;

interface PokemonCardPairs {
  [key: string]: Card[];
}

function createCard(options: {
  id: number;
  sprite: string;
  onCardSelect: (id: number) => void;
}) {
  const { id, sprite, onCardSelect } = options;
  const cardObj = kctx.add([
    kctx.sprite('card', {
      width: 96,
      frame: 0,
    }),
    kctx.area(),
    kctx.pos(),
    kctx.anchor('center'),
    {
      cardId: id,
    },
    'card',
  ]);
  cardObj.onHover(() => {
    kctx.setCursor('pointer');
    cardObj.frame = 1;
  });
  cardObj.onHoverEnd(() => {
    kctx.setCursor('auto');
    cardObj.frame = 0;
  });

  const pokemonObj = cardObj.add([
    kctx.sprite(sprite, {
      width: 180,
    }),
    kctx.anchor('center'),
  ]);
  pokemonObj.hidden = true;

  cardObj.onClick(() => {
    onCardSelect(id);
  });

  return cardObj;
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

  let pokemonGameObjects: PokemonCardObj[] = [];

  function updateCards() {
    game.getCards().forEach((card) => {
      const pokemonGameObject = pokemonGameObjects.find(
        (obj) => obj.cardId === card.id
      );

      if (pokemonGameObject === undefined) {
        throw console.error(`Could not find obj with card id ${card.id}`);
      }

      const pokemonSprite = pokemonGameObject.children[0];
      pokemonSprite.hidden = true;

      if (card.matched) {
        pokemonSprite.hidden = false;
      }

      const { first, second } = game.getSelectedCards();

      if (first === card.id || second === card.id) {
        pokemonSprite.hidden = false;
      }
    });
  }

  function handleCardSelect(id: number) {
    game.select(id);
    updateCards();

    if (game.getState() !== 'reset') {
      return;
    }

    resetCards();
  }

  async function resetCards() {
    await kctx.wait(1);

    game.reset();
    updateCards();
  }

  pokemonGameObjects = Object.values(
    game.getCards().reduce<PokemonCardPairs>(groupIntoPairs, {})
  )
    .map(createCards(handleCardSelect))
    .flat();

  pokemonGameObjects.forEach((card, index) => {
    card.moveTo(100 * index + 100, 100);
  });
}

export default gameScene;
