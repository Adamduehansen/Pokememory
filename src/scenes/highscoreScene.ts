import flashing, { FlashingComp } from '@/components/flashing';
import kctx from '@/lib/kctx';
import { GameObj, TextComp } from 'kaboom';

function AddScoreInputObject(score: number): GameObj {
  const scoreName: string[] = Array(3).fill('_');
  let currentScoreNameLetterIndex = 0;

  const container = kctx.add([]);

  container.add([
    kctx.text(`Your score ${score}`),
    kctx.pos(kctx.width() / 2, 100),
    kctx.anchor('center'),
  ]);

  container.add([
    kctx.text('Enter initials'),
    kctx.pos(kctx.width() / 2, 200),
    kctx.anchor('center'),
  ]);

  const scoreNameLetterObjects = scoreName.map(
    (scoreNameLetter, index): GameObj<TextComp | FlashingComp> => {
      return container.add([
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

  const eventController = kctx.onKeyPress((key) => {
    if (key.length > 1 && key !== 'backspace' && key !== 'enter') {
      return;
    }

    if (key === 'backspace') {
      currentScoreNameLetterIndex -= 1;
    } else if (key === 'enter') {
      if (currentScoreNameLetterIndex < scoreNameLetterObjects.length - 1) {
        return;
      }
      console.log('Submit score!', score);
      container.destroy();
      eventController.cancel();
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

  return container;
}

function highscoreScene(score: number): void {
  AddScoreInputObject(score);
}

export default highscoreScene;
