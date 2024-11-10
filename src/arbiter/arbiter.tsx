import { GetMoves } from "../Data/interfaces";
import piecesDirections from "../Data/piecesDirections";
import { calcMoves, checkCastle } from "./calcMoves";
import { calcPawnMoves } from "./calcPawnMoves";

export const getMoves = (params: GetMoves) => {
  switch (params.piece[1]) {
    case "r": {
      const directions = piecesDirections.r;
      return calcMoves(params, directions, "board");
    }
    case "b": {
      const directions = piecesDirections.b;
      return calcMoves(params, directions, "board");
    }
    case "n": {
      const directions = piecesDirections.n;
      return calcMoves(params, directions, "step");
    }
    case "q": {
      const directions = piecesDirections.q;
      return calcMoves(params, directions, "board");
    }
    case "k": {
      const directions = piecesDirections.k;
      const moves = calcMoves(params, directions, "step");
      const castleMoves: [number, number][] = checkCastle(params);
      return [...moves, ...castleMoves];
    }
    case "p": {
      const directions =
        params.turn === "w" ? piecesDirections.wp : piecesDirections.bp;
      return calcPawnMoves(params, directions);
    }
    default:
      return [];
  }
};

export const getIsKingInCheck = ({
  turn,
  currentPosition,
}: {
  turn: string;
  currentPosition: string[][];
}) => {
  const king = `${turn}k`;
  const kingPosition = getPiecePosition(currentPosition, king);
  if (!kingPosition) {
    throw new Error("King position not found");
  }
  const { rank, file } = kingPosition;
  // TODO: is queen rook is threatening the king
  const rookDirections = piecesDirections.r;
  const rookstep = 8;
  const enemy = turn === "w" ? "b" : "w";
  for (const [x, y] of rookDirections) {
    for (let i = 1; i < rookstep; i++) {
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
      if (
        currentPosition[newRank - 1]?.[newFile - 1] === `${enemy}r` ||
        currentPosition[newRank - 1]?.[newFile - 1] === `${enemy}q`
      ) {
        return true;
      }
    }
  }
  // TODO: is queen bishop is threatening the king
  const bishopDirections = piecesDirections.b;
  const bishopstep = 8;
  for (const [x, y] of bishopDirections) {
    for (let i = 1; i < bishopstep; i++) {
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
      if (
        currentPosition[newRank - 1]?.[newFile - 1] === `${enemy}b` ||
        currentPosition[newRank - 1]?.[newFile - 1] === `${enemy}q`
      ) {
        return true;
      }
    }
  }
  // TODO: is knight threatening the king
  const knightDirections = piecesDirections.n;
  const knightstep = 2;
  for (const [x, y] of knightDirections) {
    for (let i = 1; i < knightstep; i++) {
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
      if (currentPosition[newRank - 1]?.[newFile - 1] === `${enemy}n`) {
        return true;
      }
    }
  }
  // TODO: is pawn threatening the king
  if (
    currentPosition[rank + (turn === "w" ? 1 : -1) - 1]?.[file + 1 - 1] ===
    `${enemy}p`
  ) {
    return true;
  }
  if (
    currentPosition[rank + (turn === "w" ? 1 : -1) - 1]?.[file - 1 - 1] ===
    `${enemy}p`
  ) {
    return true;
  }

  return false;
};

export const getPiecePosition = (
  currentPositions: string[][],
  piece: string
) => {
  for (let rank = 1; rank <= 8; rank++) {
    for (let file = 1; file <= 8; file++) {
      if (currentPositions[rank - 1][file - 1] === piece) {
        return { rank, file };
      }
    }
  }
};
