import kctx from '@/lib/kctx';
import { EventController, GameObj, PosComp, SpriteComp } from 'kaboom';

export type PokemonCardObj = GameObj<PosComp | SpriteComp | CardComp>;

interface CardComp {
  readonly pokemondId: number;
  isMatched: () => boolean;
  isUpside: () => boolean;
  setMatched: () => void;
  setInvalid: (invalid: boolean) => void;
  turn: () => void;
}

function card(pokemonId: number): CardComp {
  let matched = false;
  return {
    pokemondId: pokemonId,
    isMatched: () => matched,
    isUpside: function (this: PokemonCardObj) {
      return !this.children[0].hidden;
    },
    setMatched: function (this: PokemonCardObj) {
      matched = true;
      this.frame = 2;
      this.children[0].hidden = false;
      kctx.setCursor('auto');
    },
    setInvalid: function (this: PokemonCardObj, invalid: boolean) {
      this.frame = invalid ? 3 : 0;
      this.frame = invalid ? 3 : 0;
    },
    turn: function (this: PokemonCardObj) {
      this.children[0].hidden = !this.children[0].hidden;
    },
  };
}

function onCardHover(this: PokemonCardObj): void {
  if (this.isMatched()) {
    return;
  }
  kctx.setCursor('pointer');
  this.frame = 1;
}

function onCardHoverEnd(this: PokemonCardObj): void {
  if (this.isMatched()) {
    return;
  }
  kctx.setCursor('auto');
  this.frame = 0;
}

function makeOnClickHandler(handler: (id: number) => void): () => void {
  return function (this: PokemonCardObj) {
    if (this.id) {
      handler(this.id);
    }
  };
}

export function createCard(options: {
  pokemonId: number;
  sprite: string;
  onCardSelect: (id: number) => void;
}): PokemonCardObj {
  const { pokemonId, sprite, onCardSelect } = options;
  const cardObj = kctx.add([
    kctx.sprite('card', {
      width: 96,
      frame: 0,
    }),
    kctx.area(),
    kctx.pos(),
    kctx.anchor('center'),
    card(pokemonId),
    'card',
  ]);

  const hoverController = cardObj.onHover(onCardHover.bind(cardObj));
  const hoverEndController = cardObj.onHoverEnd(onCardHoverEnd.bind(cardObj));
  const clickController = cardObj.onClick(
    makeOnClickHandler(onCardSelect).bind(cardObj)
  ) as unknown as EventController;

  cardObj.on('pause', () => {
    hoverController.paused = true;
    hoverEndController.paused = true;
    clickController.paused = true;
  });

  cardObj.on('resume', () => {
    hoverController.paused = false;
    hoverEndController.paused = false;
    clickController.paused = false;
  });

  const pokemonObj = cardObj.add([
    kctx.sprite(sprite, {
      width: 180,
    }),
    kctx.anchor('center'),
  ]);
  pokemonObj.hidden = true;

  if (import.meta.env.DEV) {
    cardObj.add([
      kctx.text(`P_ID: ${pokemonId}`, {
        size: 22,
      }),
      kctx.anchor('bot'),
      kctx.pos(0, 100),
      kctx.color(kctx.RED),
    ]);
  }

  return cardObj;
}
