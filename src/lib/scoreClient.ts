export interface Score {
  id: string;
  name: string;
  score: number;
}

export type NewScore = Pick<Score, 'name' | 'score'>;

export interface ScoreClient {
  getAllScores: () => Promise<ScoreServiceResult<Score[]>>;
  addScore: (newScore: NewScore) => Promise<ScoreServiceResult<null>>;
  ping: () => Promise<boolean>;
}

const { VITE_WS_URL } = import.meta.env;

interface ScoreServiceResult<T> {
  data: T;
  error?: unknown;
}

async function getAllScores(): Promise<ScoreServiceResult<Score[]>> {
  try {
    const result = await fetch(`${VITE_WS_URL}/score`);
    return {
      data: await result.json(),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}

async function addScore(newScore: NewScore): Promise<ScoreServiceResult<null>> {
  try {
    await fetch(`${VITE_WS_URL}/score`, {
      method: 'POST',
      body: JSON.stringify(newScore),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return {
      data: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

async function ping() {
  try {
    return (await fetch(VITE_WS_URL)).ok;
  } catch (error) {
    return false;
  }
}

const scoreClient: ScoreClient = {
  getAllScores: getAllScores,
  addScore: addScore,
  ping: ping,
};

export default scoreClient;
