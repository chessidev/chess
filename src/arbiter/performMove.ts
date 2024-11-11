import { Moves, performMoveParam, PromotionParam } from "../Data/interfaces";
import {
  enPassant,
  getCandidates,
  makeNewMove,
  promote,
  promotionDone,
  updateCastle,
  updateDraw50,
  updatePositionsHistory,
} from "../Reducer/actions";
import { copyPositionsArray } from "../Utilities/copyPositionsArray";
import { generatePositionKey } from "../Utilities/generatePositionKey";
import { getEnPassantMoves } from "./calcPawnMoves";

const performMove = ({
  data,
  x,
  y,
  positions,
  candidates,
  turn,
  counter,
  castle,
  dispatch,
  enPassantSquares,
  positionsHistory,
}: performMoveParam) => {
  const [piece, fileString, rankString] = data.split(",");
  const rank = Number(rankString);
  const fileNumber = Number(fileString);
  const enemy = turn === "w" ? "b" : "w";

  if (
    candidates.find(([file, rank]) => x === file && y === rank) &&
    piece[0] === turn
  ) {
    const currentPosition = positions[positions.length - 1];
    const newPositions = copyPositionsArray(currentPosition);

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
    if (!(piece[1] === "p" && (y === 1 || y === 8))) {
      // 50 move rule
      if (currentPosition[y - 1][x - 1]?.[0] === enemy || piece[1] === "p") {
        const newCounter50 = enemy === "w" ? counter + 1 : counter;
        dispatch(updateDraw50({ counter50: newCounter50, turn: enemy }));
      }

      // enPassantSquares update
      let possibleEnPassantSquare: Moves = [];
      if (piece[1] === "p" && Math.abs(rank - y) === 2) {
        const fileForFutureEnPassant =
          newPositions[y - 1][x - 1 - 1] === `${enemy}p`
            ? x - 1
            : newPositions[y - 1][x + 1 - 1] === `${enemy}p`
            ? x + 1
            : 0;
        if (fileForFutureEnPassant) {
          possibleEnPassantSquare = getEnPassantMoves({
            positions: [...positions, newPositions],
            rank: y,
            file: fileForFutureEnPassant,
            turn: enemy,
            piece: `${enemy}p`,
          });
        }
        console.log(possibleEnPassantSquare);
      }
      if (
        JSON.stringify(possibleEnPassantSquare) !==
        JSON.stringify(enPassantSquares)
      ) {
        dispatch(enPassant({ enPassantSquares: possibleEnPassantSquare }));
      }

      // positionsHistory update
      const newKey = generatePositionKey({
        position: newPositions,
        turn: enemy,
        castle,
        enPassantSquares: possibleEnPassantSquare,
      });
      if (positionsHistory[newKey]) positionsHistory[newKey] += 1;
      else positionsHistory[newKey] = 1;
      dispatch(updatePositionsHistory({ positionsHistory }));

      // move done
      dispatch(makeNewMove({ newPositions }));
    }
  }

  dispatch(getCandidates({ candidates: [] }));
};

const performPromotion = ({
  x,
  y,
  piece,
  positions,
  dispatch,
  turn,
  counter,
  castle,
  positionsHistory,
}: PromotionParam) => {
  const newPositions = copyPositionsArray(positions);
  const enemy = turn === "w" ? "b" : "w";

  newPositions[y - 1][x - 1] = piece;
  const newCounter50 = enemy === "w" ? counter + 1 : counter;

  dispatch(updateDraw50({ counter50: newCounter50, turn: enemy }));
  dispatch(enPassant({ enPassantSquares: [] }));

  // positionsHistory update
  const newKey = generatePositionKey({
    position: newPositions,
    turn: enemy,
    castle,
    enPassantSquares: [],
  });
  if (positionsHistory[newKey]) positionsHistory[newKey] += 1;
  else positionsHistory[newKey] = 1;
  dispatch(updatePositionsHistory({ positionsHistory }));

  // move done
  dispatch(promotionDone({ newPositions }));
};

export { performMove, performPromotion };
