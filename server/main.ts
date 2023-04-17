import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v12.1.0/mod.ts';

interface Score {
  id: string;
  name: string;
  score: number;
}

const scoresDb: Score[] = [];

function getAllScores(context: Context) {
  context.response.body = scoresDb;
}

async function addScore(context: Context) {
  const newScore = (await context.request.body().value) as Pick<
    Score,
    'name' | 'score'
  >;
  scoresDb.push({
    id: crypto.randomUUID(),
    ...newScore,
  });
  context.response.status = 401;
}

const router = new Router();
router.get('/', (context) => {
  context.response.body = 'Hello, World!';
});

router.get('/score', getAllScores);
router.post('/score', addScore);

const app = new Application();
app.use(router.routes());

await app.listen({
  port: 8000,
});
