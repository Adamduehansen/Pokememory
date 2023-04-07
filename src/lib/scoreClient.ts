export interface Score {
  id: string;
  name: string;
  score: number;
}

export type NewScore = Pick<Score, 'name' | 'score'>;

export interface ScoreClient {
  getAllScores: () => Promise<Score[]>;
  addScore: (newScore: NewScore) => Promise<void>;
}

const { VITE_WS_URL } = import.meta.env;

async function getAllScores(): Promise<Score[]> {
  const result = await fetch(`${VITE_WS_URL}/score`);
  return await result.json();
}

async function addScore(newScore: NewScore): Promise<void> {
  await fetch(`${VITE_WS_URL}/score`, {
    method: 'POST',
    body: JSON.stringify(newScore),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const scoreClient: ScoreClient = {
  getAllScores: getAllScores,
  addScore: addScore,
};

export default scoreClient;
