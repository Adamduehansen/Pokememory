import { GameObj, TextComp } from 'kaboom';
import flashing, { FlashingComp } from '@/components/flashing';
import kctx from '@/lib/kctx';
import scoreClient, { NewScore } from '@/lib/scoreClient';
import * as db from '../lib/db';
import createButton from '@/gameobjects/button';
import scenes from '@/lib/scenes';

function showErrorAlert(errorMessage: string): void {
  kctx.add([
    kctx.pos(kctx.center()),
    kctx.anchor('center'),
    kctx.text(errorMessage, {
      size: 18,
      width: 400,
    }),
  ]);
}

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
    kctx.pos(kctx.width() / 2, 250),
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

async function renderScores(container: GameObj): Promise<void> {
  const loadingScoreObj = container.add([
    kctx.text('Loading scores...'),
    kctx.pos(0, 0),
    kctx.anchor('center'),
  ]);

  const { data: scores, error } = await scoreClient.getAllScores();
  loadingScoreObj.destroy();

  if (error !== undefined) {
    console.error(error);
    showErrorAlert('Unable to connect to score server.');
    return;
  }

  const topFiveScores = scores
    .sort((scoreA, scoreB) => {
      return scoreB.score - scoreA.score;
    })
    .splice(0, 5);

  topFiveScores.forEach(({ name, score }, index) => {
    const scoreEntry = container.add([
      kctx.pos(0, -200 + index * 100),
      kctx.rect(400, 50),
      kctx.anchor('center'),
      kctx.opacity(0),
    ]);
    scoreEntry.add([kctx.text(name), kctx.pos(-200, 0), kctx.anchor('left')]);
    scoreEntry.add([
      kctx.text(score.toString()),
      kctx.anchor('right'),
      kctx.pos(200, 0),
    ]);
  });
}

async function submitStoredScores() {
  if (!(await scoreClient.ping())) {
    return;
  }

  const storedScores = await db.getAll();
  storedScores.forEach(scoreClient.addScore);
  await db.clear();
}

function highscoreScene(score: number | undefined): void {
  const scoreContainer = kctx.add([
    kctx.rect(600, 700, {
      radius: 5,
    }),
    kctx.color(kctx.BLACK),
    kctx.outline(5, kctx.GREEN),
    kctx.pos(kctx.center()),
    kctx.anchor('center'),
  ]);

  scoreContainer.add([
    kctx.text('Scores'),
    kctx.pos(0, -300),
    kctx.anchor('center'),
  ]);

  createButton({
    text: 'New Game',
    pos: kctx.vec2(kctx.width() / 2, kctx.height() / 2 + 300),
    size: {
      h: 50,
      w: 200,
    },
    onClick: function () {
      kctx.go(scenes.preload);
    },
  });

  async function scoreSubmitHandler(newScore: NewScore) {
    const { error } = await scoreClient.addScore(newScore);
    if (error) {
      db.addScore(newScore);
      showErrorAlert(
        'Could not connect to the score server, but your score has been saved!\n\nVisit the highscore page again once connection is restored to submit your score...'
      );
      return;
    }
    renderScores(scoreContainer);
  }

  if (score === undefined) {
    renderScores(scoreContainer);
  } else {
    AddScoreInputObject(score, scoreSubmitHandler);
  }

  submitStoredScores();
}

export default highscoreScene;
