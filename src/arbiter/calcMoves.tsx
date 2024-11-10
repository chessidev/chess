import { GetMoves } from "../Data/interfaces";
import { getIsKingInCheck } from "./arbiter";

export const calcMoves = (
  { rank, file, positions, turn, piece }: GetMoves,
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
        if (
          isValidMoveWRTCheck({
            currentPosition,
            move: { newRank, newFile },
            piece,
            rank,
            file,
          })
        )
          moves.push([newFile, newRank]);
      } else if (currentPosition[newRank - 1]?.[newFile - 1]?.[0] === enemy) {
        if (
          isValidMoveWRTCheck({
            currentPosition,
            move: { newRank, newFile },
            piece,
            rank,
            file,
          })
        )
          moves.push([newFile, newRank]);
        break;
      }
    }
  });
  return moves;
};

export const checkCastle = (params: GetMoves): [number, number][] => {
  const { turn, positions, isKingChecked } = params;
  const castleMoves: [number, number][] = [];
  const currentPosition = positions[params.positions.length - 1];
  const rank = turn === "w" ? 1 : 8;

  if (!isKingChecked) {
    if (params.castle[turn as "w" | "b"].king) {
      if (
        currentPosition[rank - 1][5] === "" &&
        currentPosition[rank - 1][6] === "" &&
        isValidMoveWRTCheck({
          currentPosition,
          move: { newRank: rank, newFile: 6 },
          piece: `${turn}k`,
          rank,
          file: 5,
        }) &&
        isValidMoveWRTCheck({
          currentPosition,
          move: { newRank: rank, newFile: 7 },
          piece: `${turn}k`,
          rank,
          file: 5,
        })
      ) {
        castleMoves.push([7, rank]);
      }
    }

    if (params.castle[turn as "w" | "b"].queen) {
      if (
        currentPosition[rank - 1][1] === "" &&
        currentPosition[rank - 1][2] === "" &&
        currentPosition[rank - 1][3] === "" &&
        isValidMoveWRTCheck({
          currentPosition,
          move: { newRank: rank, newFile: 4 },
          piece: `${turn}k`,
          rank,
          file: 5,
        }) &&
        isValidMoveWRTCheck({
          currentPosition,
          move: { newRank: rank, newFile: 3 },
          piece: `${turn}k`,
          rank,
          file: 5,
        })
      ) {
        castleMoves.push([3, rank]);
      }
    }
  }
  return castleMoves;
};

export const isValidMoveWRTCheck = ({
  currentPosition,
  move,
  piece,
  rank,
  file,
}: {
  currentPosition: string[][];
  move: { newRank: number; newFile: number };
  piece: string;
  rank: number;
  file: number;
}) => {
  const { newRank, newFile } = move;
  const newPosition = currentPosition.map((rank) => rank.map((file) => file));
  newPosition[newRank - 1][newFile - 1] = piece;
  newPosition[rank - 1][file - 1] = "";
  const isKingInCheck = getIsKingInCheck({
    turn: piece[0],
    currentPosition: newPosition,
  });
  return !isKingInCheck;
};
