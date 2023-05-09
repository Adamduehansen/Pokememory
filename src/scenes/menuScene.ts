import createButton from '@/gameobjects/button';
import kctx from '@/lib/kctx';
import scenes from '@/lib/scenes';

export default function menuScene(): void {
  function goToNewGame() {
    kctx.go(scenes.preload);
  }

  function goToHighscore() {
    kctx.go(scenes.highscore);
  }

  const { x: centerX, y: centerY } = kctx.center();

  kctx.add([
    kctx.text('POKEMEMORY'),
    kctx.pos(centerX, centerY - 100),
    kctx.anchor('center'),
  ]);

  createButton({
    text: 'New Game',
    pos: kctx.vec2(centerX, centerY),
    onClick: goToNewGame,
    size: {
      w: 200,
      h: 50,
    },
  });

  createButton({
    text: 'Highscore',
    pos: kctx.vec2(centerX, centerY + 100),
    onClick: goToHighscore,
    size: {
      w: 250,
      h: 50,
    },
  });

  // newGameButton.onClick(newGame);
}
