import { JSX } from "preact/jsx-runtime";
import { Score } from "@lib/types.ts";

type Props = {
  scores: Score[];
};

export function Scores({ scores }: Props): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Score</td>
        </tr>
      </thead>
      {scores.map(({ name, score }): JSX.Element => {
        return (
          <tr>
            <td>{name}</td>
            <td>{score}</td>
          </tr>
        );
      })}
    </table>
  );
}
