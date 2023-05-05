import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Score, NewScore } from './scoreClient';

interface DB extends DBSchema {
  score: {
    key: string;
    value: Score;
  };
}

async function getDB(): Promise<IDBPDatabase<DB>> {
  return await openDB<DB>('pokememory', 1, {
    upgrade: function (db) {
      db.createObjectStore('score', {
        keyPath: 'id',
      });
    },
  });
}

export async function addScore(score: NewScore) {
  (await getDB()).put('score', {
    id: crypto.randomUUID(),
    name: score.name,
    score: score.score,
  });
}

export async function getAll() {
  return (await getDB()).getAll('score');
}

export async function clear() {
  return (await getDB()).clear('score');
}
