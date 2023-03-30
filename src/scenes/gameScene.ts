import { createCard, PokemonCardObj } from '@/gameobjects/Card';
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

  cards.forEach((card, index) => {
    card.pos = kctx.vec2(100 + index * 100, 100);
  });
}

export default gameScene;
