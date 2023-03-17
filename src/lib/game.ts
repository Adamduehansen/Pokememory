interface Game {
  readonly firstSelectedId?: number;
  select: (id: number) => void;
}

export function createGame(): Game {
  return {
    select: function () {},
  };
}
