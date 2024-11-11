import { performMoveParam, PromotionParam } from "../Data/interfaces";
import {
  getCandidates,
  makeNewMove,
  promote,
  promotionDone,
  updateCastle,
} from "../Reducer/actions";
import { copyPositionsArray } from "../Utilities/copyPositionsArray";

const performMove = ({
  data,
  x,
  y,
  positions,
  candidates,
  turn,
  castle,
  dispatch,
}: performMoveParam) => {
  const [piece, fileString, rankString] = data.split(",");
  const rank = Number(rankString);
  const fileNumber = Number(fileString);

  if (
    candidates.find(([file, rank]) => x === file && y === rank) &&
    piece[0] === turn
  ) {
    const newPositions = copyPositionsArray(positions);

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

    // Castle
    if (piece[1] === "k" && Math.abs(fileNumber - x) >= 2) {
      if (x === 7) {
        newPositions[y - 1][5] = newPositions[y - 1][7];
        newPositions[y - 1][7] = "";
      } else if (x === 3) {
        newPositions[y - 1][3] = newPositions[y - 1][0];
        newPositions[y - 1][0] = "";
      }
    }

    // All Pieces
    newPositions[rank - 1][fileNumber - 1] = "";
    newPositions[y - 1][x - 1] = piece;

    // Promotion
    if (piece[1] === "p" && (y === 1 || y === 8)) {
      dispatch(promote({ x, y, piece, newPositions }));
    }

    // stop castle
    // for king
    if (piece[1] === "k") {
      if (turn === "w")
        dispatch(
          updateCastle({
            castle: {
              ...castle,
              w: {
                king: false,
                queen: false,
              },
            },
          })
        );
      else if (turn === "b") {
        dispatch(
          updateCastle({
            castle: {
              ...castle,
              b: {
                king: false,
                queen: false,
              },
            },
          })
        );
      }
    }
    // for rook
    if (piece[1] === "r") {
      if (turn === "w") {
        if (fileNumber === 1) {
          dispatch(
            updateCastle({
              castle: {
                ...castle,
                w: {
                  king: castle.w.king,
                  queen: false,
                },
              },
            })
          );
        } else if (fileNumber === 8) {
          dispatch(
            updateCastle({
              castle: {
                ...castle,
                w: {
                  king: false,
                  queen: castle.w.queen,
                },
              },
            })
          );
        }
      } else if (turn === "b") {
        if (fileNumber === 1) {
          dispatch(
            updateCastle({
              castle: {
                ...castle,
                b: {
                  king: castle.b.king,
                  queen: false,
                },
              },
            })
          );
        } else if (fileNumber === 8) {
          dispatch(
            updateCastle({
              castle: {
                ...castle,
                b: {
                  king: false,
                  queen: castle.b.queen,
                },
              },
            })
          );
        }
      }
    }

    // End of turn if no promotion
    if (!(piece[1] === "p" && (y === 1 || y === 8)))
      dispatch(makeNewMove({ newPositions }));
  }

  dispatch(getCandidates({ candidates: [] }));
};

const performPromotion = ({
  x,
  y,
  piece,
  positions,
  dispatch,
}: PromotionParam) => {
  const newPositions = copyPositionsArray(positions);
  newPositions[y - 1][x - 1] = piece;
  dispatch(promotionDone({ newPositions }));
};

export { performMove, performPromotion };
