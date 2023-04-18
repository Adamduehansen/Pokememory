import { describe, test, expect, vi } from 'vitest';
import { getRandomPokemonIds } from './utils';

describe('game', () => {
  describe('getRandomPokemonIds', () => {
    test('should only generate unique ids', () => {
      // Arrange
      const getIdHandlerMock = vi
        .fn()
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2);
      const expectedIds = [1, 2];

      // Act
      const actualIds = getRandomPokemonIds(2, getIdHandlerMock);

      // Assert
      expect(getIdHandlerMock).toHaveBeenCalledTimes(3);
      expect(actualIds).toEqual(expectedIds);
    });
  });
});
