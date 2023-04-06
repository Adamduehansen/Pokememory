import kctx from '@/lib/kctx';
import { Comp, GameObj, TextComp } from 'kaboom';

interface FlashingComp extends Comp {
  disableFlashing: boolean;
}

function flashing(
  interval: number,
  options?: {
    disable: boolean;
  }
): FlashingComp {
  let pauseFlashing = options?.disable || false;
  let animationTimer = 0;
  return {
    disableFlashing: pauseFlashing,
    update: function (this: GameObj<FlashingComp>) {
      if (this.disableFlashing) {
        this.hidden = false;
        animationTimer = 0;
        return;
      }

      animationTimer += kctx.dt();

      if (animationTimer <= interval) {
        this.hidden = true;
      } else if (animationTimer > interval && animationTimer <= interval * 2) {
        this.hidden = false;
      } else {
        animationTimer = 0;
      }
    },
  };
}

function highscoreScene(score: number): void {
  const scoreName: string[] = Array(3).fill('_');
  let scoreSubmitted = false;
  let currentScoreNameLetterIndex = 0;

  kctx.add([
    kctx.text(`Your score ${score}`),
    kctx.pos(kctx.width() / 2, 100),
    kctx.anchor('center'),
    'scoreLabel',
  ]);

  kctx.add([
    kctx.text('Enter initials'),
    kctx.pos(kctx.width() / 2, 200),
    kctx.anchor('center'),
    'scoreLabel',
  ]);

  const scoreNameLetterObjects = scoreName.map(
    (scoreNameLetter, index): GameObj<TextComp | FlashingComp> => {
      return kctx.add([
        kctx.text(scoreNameLetter),
        kctx.pos(kctx.width() / 2 + index * 100, 300),
        kctx.anchor('center'),
        flashing(0.5, {
          disable: index > 0,
        }),
        'scoreLabel',
      ]);
    }
  );

  kctx.onKeyPress((key) => {
    if (
      (key.length > 1 && key !== 'backspace' && key !== 'enter') ||
      scoreSubmitted
    ) {
      return;
    }

    if (key === 'backspace') {
      currentScoreNameLetterIndex -= 1;
    } else if (key === 'enter') {
      if (currentScoreNameLetterIndex < scoreNameLetterObjects.length - 1) {
        return;
      }
      console.log('Submit score!', score);
      kctx.destroyAll('scoreLabel');
      scoreSubmitted = true;
    } else {
      scoreNameLetterObjects[currentScoreNameLetterIndex].text = key;

      if (currentScoreNameLetterIndex < scoreNameLetterObjects.length - 1) {
        currentScoreNameLetterIndex += 1;
      }
    }

    scoreNameLetterObjects.forEach((obj, index) => {
      obj.disableFlashing = index !== currentScoreNameLetterIndex;
    });
  });
}

export default highscoreScene;
