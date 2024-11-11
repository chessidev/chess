import { Status } from "../Data/gameStatus";
import { GameStatusParams } from "../Data/interfaces";

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
    positionsHistory,
    pieces
  );

  // 50 move rule
  if (counter - draw50.counter50 === 50 && draw50.turn === turn)
    return Status.fiftyMoveRule;

  // 75 move rule
  if (counter - draw50.counter50 === 75 && draw50.turn === turn)
    return Status.draw75;

  return Status.ongoing;
};
