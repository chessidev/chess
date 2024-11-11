import { actionTypes } from "../Data/actionTypes";
import { Action, Castle, Moves } from "../Data/interfaces";

const makeNewMove = ({
  newPositions,
}: {
  newPositions: string[][];
}): Action => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPositions },
  };
};

const getCandidates = ({ candidates }: { candidates: Moves }): Action => {
  return {
    type: actionTypes.GET_CANDIDATES,
    payload: { candidates },
  };
};

const promote = ({
  x,
  y,
  piece,
  newPositions,
}: {
  x: number;
  y: number;
  piece: string;
  newPositions: string[][];
}): Action => {
  const promotion = { x, y, piece };
  return {
    type: actionTypes.PROMOTE,
    payload: { promotion, newPositions },
  };
};

const promotionDone = ({
  newPositions,
}: {
  newPositions: string[][];
}): Action => {
  return {
    type: actionTypes.PROMOTION_DONE,
    payload: { newPositions },
  };
};

const updateCastle = ({ castle }: { castle: Castle }) => {
  return {
    type: actionTypes.UPDATE_CASTLE,
    payload: { castle },
  };
};

const isKingInCheck = ({ isKingChecked }: { isKingChecked: boolean }) => {
  return {
    type: actionTypes.IS_KING_CHECKED,
    payload: { isKingChecked },
  };
};

export {
  makeNewMove,
  getCandidates,
  promote,
  promotionDone,
  updateCastle,
  isKingInCheck,
};
