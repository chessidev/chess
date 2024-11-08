import { GetMoves } from "../Data/interfaces";

export const calcMoves = (
  { rank, file, positions, turn }: GetMoves,
  directions: number[][],
  range: "step" | "board"
) => {
  const moves: [number, number][] = [];
  const enemy = turn === "w" ? "b" : "w";
  const step = range === "step" ? 2 : 8;
  const currentPosition = positions[positions.length - 1];
  directions.forEach(([x, y]) => {
    for (let i = 1; i < step; i++) {
      const newFile = file + i * x;
      const newRank = rank + i * y;
      if (
        newFile < 1 ||
        newFile > 8 ||
        newRank < 1 ||
        newRank > 8 ||
        currentPosition[newRank - 1]?.[newFile - 1]?.[0] === turn
      ) {
        break;
      }
      if (currentPosition[newRank - 1]?.[newFile - 1] === "") {
        moves.push([newFile, newRank]);
      } else if (currentPosition[newRank - 1]?.[newFile - 1]?.[0] === enemy) {
        moves.push([newFile, newRank]);
        break;
      }
    }
  });
  return moves;
};

export const checkCastle = (params: GetMoves): [number, number][] => {
  const turn = params.turn;
  const castleMoves: [number, number][] = [];
  const currentPositions = params.positions[params.positions.length - 1];
  const rank = turn === "w" ? 1 : 8;

  if (params.castle[turn as "w" | "b"].king) {
    if (
      currentPositions[rank - 1][5] === "" &&
      currentPositions[rank - 1][6] === ""
    ) {
      castleMoves.push([7, rank]);
    }
  }

  if (params.castle[turn as "w" | "b"].queen) {
    if (
      currentPositions[rank - 1][1] === "" &&
      currentPositions[rank - 1][2] === "" &&
      currentPositions[rank - 1][3] === ""
    ) {
      castleMoves.push([3, rank]);
    }
  }
  return castleMoves;
};
