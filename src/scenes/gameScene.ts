import { createCard, PokemonCardObj } from '@/gameobjects/Card';
import shuffle from 'lodash/shuffle';
import kctx from '@/lib/kctx';

async function onCardSelectHandler(selectedCardId: number): Promise<void> {
  const allCards = kctx.get('card') as PokemonCardObj[];
  const selectedCard = allCards.find((card) => card.id === selectedCardId);

  if (selectedCard === undefined || selectedCard.isMatched()) {
    return;
  }

  selectedCard.turn();

  const turnedCards = allCards.filter(
    (card) => card.isUpside() && !card.isMatched()
  );

  if (turnedCards.length === 2) {
    const [firstCard, secondCard] = turnedCards;

    if (firstCard.pokemondId === secondCard.pokemondId) {
      firstCard.setMatched();
      secondCard.setMatched();
    } else {
      allCards.forEach((card) => card.trigger('pause'));
      firstCard.setInvalid(true);
      secondCard.setInvalid(true);

      await kctx.wait(1);

      allCards.forEach((card) => card.trigger('resume'));
      firstCard.setInvalid(false);
      secondCard.setInvalid(false);

      firstCard.turn();
      secondCard.turn();
    }
  }

  if (allCards.every((card) => card.isMatched())) {
    console.log('Game done!');
  }
}

const CELL_WIDTH = 150;
const CELL_HEIGHT = 200;

function positionCardsInGrid(
  cards: PokemonCardObj[],
  options: {
    columns: number;
    rows: number;
  }
) {
  const { columns, rows } = options;

  // Magic number somehow matches the size of the card sprite and gives an
  // extra padding to the start x position. This way all cards are centered
  // on the screen.
  const magicWidthNumber = 74;
  const startX =
    kctx.width() / 2 - (columns * CELL_WIDTH) / 2 + magicWidthNumber;
  const startY = kctx.height() / 2 - (rows * CELL_HEIGHT) / 2;

  let columnIndex = 0;
  let rowIndex = 0;

  for (const card of cards) {
    const position = kctx.vec2(
      startX + columnIndex * CELL_WIDTH,
      startY + rowIndex * CELL_HEIGHT
    );
    card.pos = position;

    columnIndex++;
    if (columnIndex >= columns) {
      columnIndex = 0;
      rowIndex++;
    }
  }
}

function gameScene(pokemonIds: number[]): void {
  const cards: PokemonCardObj[] = pokemonIds
    .map((pokemonId): PokemonCardObj[] => {
      return [
        createCard({
          pokemonId: pokemonId,
          sprite: `${pokemonId}-back`,
          onCardSelect: onCardSelectHandler,
        }),
        createCard({
          pokemonId: pokemonId,
          sprite: `${pokemonId}-front`,
          onCardSelect: onCardSelectHandler,
        }),
      ];
    })
    .flat();

  const shuffledCards = shuffle(cards);

  positionCardsInGrid(shuffledCards, {
    rows: 3,
    columns: 4,
  });
}

export default gameScene;
