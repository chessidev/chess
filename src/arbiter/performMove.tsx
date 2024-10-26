import { performMoveParam, PromotionParam } from "../Data/interfaces";
import {
  getCandidates,
  makeNewMove,
  promote,
  promotionDone,
} from "../reducer/actions/move";

export const performMove = ({
  data,
  x,
  y,
  positions,
  candidates,
  turn,
  dispatch,
}: performMoveParam) => {
  const [piece, fileString, rankString] = data.split(",");
  const rank = Number(rankString);
  const fileNumber = Number(fileString);
  if (
    candidates.find(([file, rank]) => x === file && y === rank) &&
    piece[0] === turn
  ) {
    const newPositions = positions.map((rank) => rank.map((file) => file));

    // En Passant
    if (
      piece[1] === "p" &&
      fileNumber !== x &&
      rank !== y &&
      newPositions[y - 1][x - 1] === ""
    ) {
      if (x === fileNumber + 1) newPositions[rank - 1][x - 1] = "";
      else if (x === fileNumber - 1) newPositions[rank - 1][x - 1] = "";
    }

    // All Pieces
    newPositions[rank - 1][fileNumber - 1] = "";
    newPositions[y - 1][x - 1] = piece;

    // Promotion
    if (piece[1] === "p" && (y === 1 || y === 8)) {
      dispatch(promote({ x, y, piece, newPositions }));
    } else dispatch(makeNewMove({ newPositions }));
  }
  dispatch(getCandidates({ candidates: [] }));
};

export const performPromotion = ({
  x,
  y,
  piece,
  positions,
  dispatch,
}: PromotionParam) => {
  const newPositions = positions.map((rank) => rank.map((file) => file));
  newPositions[y - 1][x - 1] = piece;
  dispatch(promotionDone({ newPositions }));
};
