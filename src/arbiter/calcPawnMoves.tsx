import { GetMoves } from "../Data/interfaces";

export const calcPawnMoves = (
  { rank, file, positions, turn }: GetMoves,
  directions: number[][]
) => {
  const moves: [number, number][] = [];
  const enemy = turn === "w" ? "b" : "w";
  const step = rank === (turn === "w" ? 2 : 7) ? 3 : 2;
  const currentPosition = positions[positions.length - 1];
  directions.forEach(([x, y]) => {
    for (let i = 1; i < step; i++) {
      const newFile = file + i * x;
      const newRank = rank + i * y;
      if (currentPosition[newRank - 1]?.[newFile - 1] === "") {
        moves.push([newFile, newRank]);
      }
    }
  });

  // Attack moves
  if (
    currentPosition[rank + (turn === "w" ? 1 : -1) - 1]?.[file + 1 - 1]?.[0] ===
    enemy
  ) {
    moves.push([file + 1, rank + (turn === "w" ? 1 : -1)]);
  }
  if (
    currentPosition[rank + (turn === "w" ? 1 : -1) - 1]?.[file - 1 - 1]?.[0] ===
    enemy
  ) {
    moves.push([file - 1, rank + (turn === "w" ? 1 : -1)]);
  }

  return moves;
};
