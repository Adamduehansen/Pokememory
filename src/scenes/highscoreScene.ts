import flashing, { FlashingComp } from '@/components/flashing';
import kctx from '@/lib/kctx';
import scoreClient, { NewScore } from '@/lib/scoreClient';
import { GameObj, TextComp } from 'kaboom';

function AddScoreInputObject(
  score: number,
  onScoreSubmit: (score: NewScore) => void
): GameObj {
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

  const scoreNameLetterObjects = Array(3)
    .fill('_')
    .map((scoreNameLetter, index): GameObj<TextComp | FlashingComp> => {
      return container.add([
        kctx.text(scoreNameLetter),
        kctx.pos(kctx.width() / 2 - 100 + index * 100, 300),
        kctx.anchor('center'),
        flashing(0.5, {
          disable: index > 0,
        }),
      ]);
    });

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
      onScoreSubmit({
        name: scoreNameLetterObjects.map((obj) => obj.text).join(''),
        score: score,
      });
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

async function highscoreScene(score: number): Promise<void> {
  AddScoreInputObject(score, scoreClient.addScore);

  scoreClient.getAllScores().then((scores) => {
    console.log(scores);
  });
}

export default highscoreScene;
