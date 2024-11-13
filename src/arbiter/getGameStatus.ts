import { Status } from "../Data/gameStatus";
import { GameStatusParams } from "../Data/interfaces";
import { getPiecePosition } from "../Utilities/getPiecePosition";
const unclaimedRepetition: {
  [key: string]: number;
} = {};
export const getGameStatus = ({
  isKingChecked,
  positions,
  turn,
  castle,
  draw50,
  counter,
  positionsHistory,
}: GameStatusParams) => {
  const currentPosition = positions[positions.length - 1];
  const pieces = currentPosition.flat().filter((p) => p);

  console.log(
    isKingChecked,
    positions,
    turn,
    castle,
    draw50,
    counter,
    positionsHistory
  );

  // insufficient material
  if (
    pieces.length === 2 ||
    (pieces.length === 3 &&
      pieces.some((p) => p.endsWith("n") || p.endsWith("b")))
  ) {
    return Status.insufficientMaterial;
  }
  if (
    pieces.length === 4 &&
    pieces.some((p) => p === "wb") &&
    pieces.some((p) => p === "bb")
  ) {
    const { rank: wbRank, file: wbFile } = getPiecePosition(
      currentPosition,
      "wb"
    );
    const { rank: bbRank, file: bbFile } = getPiecePosition(
      currentPosition,
      "bb"
    );
    let wbColor = "light";
    let bbColor = "light";
    if (
      (wbRank % 2 === 0 && wbFile % 2 === 0) ||
      (wbRank % 2 !== 0 && wbFile % 2 !== 0)
    )
      wbColor = "dark";
    if (
      (bbRank % 2 === 0 && bbFile % 2 === 0) ||
      (bbRank % 2 !== 0 && bbFile % 2 !== 0)
    )
      bbColor = "dark";
    if (wbColor === bbColor) return Status.insufficientMaterial;
  }

  // 50 move rule
  if (counter - draw50.counter50 === 50 && draw50.turn === turn)
    return Status.fiftyMoveRule;

  // 75 move rule
  if (counter - draw50.counter50 === 75 && draw50.turn === turn)
    return Status.draw75;

  // threefold repetition
  for (const key in positionsHistory) {
    const keyCounter = positionsHistory[key];
    if (keyCounter >= 3) {
      if (!unclaimedRepetition[key]) {
        unclaimedRepetition[key] = keyCounter;
        return Status.threefoldRepetition;
      } else if (unclaimedRepetition[key] !== keyCounter) {
        unclaimedRepetition[key] = keyCounter;
        return Status.threefoldRepetition;
      }
    }
  }

  return Status.ongoing;
};
