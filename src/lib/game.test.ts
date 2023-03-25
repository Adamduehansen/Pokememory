import { describe, test, expect } from 'vitest';
import { CardFace, createGame, GameState } from './game';

describe('game', () => {
  describe('createGame', () => {
    test('should create card objects', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      const cards = game.getCards();

      // Assert
      expect(cards).toHaveLength(4);
      expect(cards[0].pokemonId).toEqual(13);
      expect(cards[0].id).toEqual(0);
      expect(cards[1].pokemonId).toEqual(13);
      expect(cards[1].id).toEqual(1);
      expect(cards[2].pokemonId).toEqual(142);
      expect(cards[2].id).toEqual(2);
      expect(cards[3].pokemonId).toEqual(142);
      expect(cards[3].id).toEqual(3);
      expect(cards.every((card) => card.matched === false)).toEqual(true);
      expect(cards.every((card) => card.face === 'downside')).toEqual(true);
    });

    test('should set selected cards to undefined', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      const { first, second } = game.getSelectedCards();

      // Assert
      expect(first).toBeUndefined();
      expect(second).toBeUndefined();
    });

    test('should set gameState idle', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      const state = game.getState();

      // Assert
      expect(state).toEqual<GameState>('idle');
    });
  });

  describe('select', () => {
    test('should store selected cards', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(1);
      game.select(2);

      // Assert
      expect(game.getSelectedCards().first).toEqual(1);
      expect(game.getSelectedCards().second).toEqual(2);
    });

    test('should set cards matched to true on match', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(1);

      const [firstMatchedCard, secondMatchedCard] = game
        .getCards()
        .filter((card) => card.matched);

      // Assert
      expect(firstMatchedCard.id).toEqual(0);
      expect(secondMatchedCard.id).toEqual(1);
    });

    test('should not select if card is equal first card', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(0);

      // Assert
      expect(game.getSelectedCards().second).toBeUndefined();
    });

    test('should not update second card if already chosen', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(1);
      game.select(2);

      // Assert
      expect(game.getSelectedCards().second).toEqual(1);
    });

    test('should set card face to upside when selected', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(1);
      const firstSelectedCard = game.getCards().find((card) => card.id === 0)!;
      const secondSelectedCard = game.getCards().find((card) => card.id === 1)!;

      // Assert
      expect(firstSelectedCard.face).toEqual<CardFace>('upside');
      expect(secondSelectedCard.face).toEqual<CardFace>('upside');
    });
  });

  describe('reset', () => {
    test('should reset selected cards', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(1);
      game.reset();

      // Assert
      expect(game.getSelectedCards().first).toBeUndefined();
      expect(game.getSelectedCards().second).toBeUndefined();
    });

    test('should not reset when only first card is selected', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.reset();

      // Assert
      expect(game.getSelectedCards().first).toEqual(0);
      expect(game.getSelectedCards().second).toBeUndefined();
    });

    test('should set game state to idle', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(0);
      game.select(1);
      game.reset();

      // Assert
      expect(game.getState()).toEqual<GameState>('idle');
    });

    test('should set all but matching cards facedown', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142, 12],
      });

      // Act
      game.select(0);
      game.select(1);
      game.reset();
      game.select(2);
      game.select(4);
      game.reset();

      const upsideCardsIds = game
        .getCards()
        .filter((card) => card.face === 'upside')
        .map((card) => card.id);
      const downsideCards = game
        .getCards()
        .filter((card) => card.face === 'downside')
        .map((card) => card.id);

      // Assert
      expect(upsideCardsIds).toContain(0);
      expect(upsideCardsIds).toContain(1);
      expect(downsideCards).toContain(2);
      expect(downsideCards).toContain(3);
      expect(downsideCards).toContain(4);
      expect(downsideCards).toContain(5);
    });
  });

  describe('getState', () => {
    test('should require reset when both first and second are chosen', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(1);
      game.select(3);

      // Assert
      expect(game.getState()).toEqual<GameState>('reset');
    });

    test('should be await state on first select', () => {
      // Arrange
      const game = createGame({
        pokemonIds: [13, 142],
      });

      // Act
      game.select(1);

      // Assert
      expect(game.getState()).toEqual<GameState>('await');
    });
  });
});
