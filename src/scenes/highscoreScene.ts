import flashing, { FlashingComp } from '@/components/flashing';
import kctx from '@/lib/kctx';
import scoreClient, { NewScore } from '@/lib/scoreClient';
import { GameObj, TextComp } from 'kaboom';

function AddScoreInputObject(
  score: number,
  onScoreSubmit: (score: NewScore) => void
): GameObj {
  let currentScoreNameLetterIndex = 0;

  const container = kctx.add([
    kctx.rect(400, 200, {
      radius: 10,
    }),
    kctx.color(kctx.BLACK),
    kctx.pos(kctx.width() / 2, 28),
    kctx.outline(5, kctx.YELLOW),
    kctx.anchor('top'),
    kctx.z(10),
  ]);

  container.add([
    kctx.text(`Your score ${score}`),
    kctx.anchor('top'),
    kctx.pos(0, 20),
  ]);

  container.add([kctx.text('Enter name'), kctx.pos(0, 80), kctx.anchor('top')]);

  const scoreNameLetterObjects = Array(3)
    .fill('_')
    .map((scoreNameLetter, index): GameObj<TextComp | FlashingComp> => {
      return container.add([
        kctx.text(scoreNameLetter),
        kctx.pos(-100 + index * 100, 130),
        kctx.anchor('top'),
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

async function renderScores(): Promise<void> {
  kctx.add([
    kctx.text('Scores'),
    kctx.pos(kctx.width() / 2, 50),
    kctx.anchor('center'),
  ]);
  const loadingScoreObj = kctx.add([
    kctx.text('Loading scores...'),
    kctx.pos(kctx.center()),
    kctx.anchor('center'),
  ]);
  const scores = await scoreClient.getAllScores();
  loadingScoreObj.destroy();
  scores.map(({ name, score }, index) => {
    const scoreEntry = kctx.add([kctx.pos(350, 100 + index * 100)]);
    scoreEntry.add([kctx.text(name)]);
    scoreEntry.add([
      kctx.text(score.toString()),
      kctx.pos(390, 0),
      kctx.anchor('topright'),
    ]);
    return scoreEntry;
  });
}

function highscoreScene(score: number): void {
  renderScores();
  AddScoreInputObject(score, scoreClient.addScore);
}

export default highscoreScene;
