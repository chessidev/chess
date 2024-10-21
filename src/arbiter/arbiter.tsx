import { GetMoves } from "../Data/interfaces";
import piecesDirections from "../Data/piecesDirections";
import { calcMoves } from "./calcMoves";
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
      return calcMoves(params, directions, "step");
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
