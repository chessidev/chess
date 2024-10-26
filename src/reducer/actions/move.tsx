import { actionTypes } from "../../Data/actionTypes";
import { Action } from "../../Data/interfaces";

export const makeNewMove = ({
  newPositions,
}: {
  newPositions: string[][];
}): Action => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPositions },
  };
};

export const getCandidates = ({
  candidates,
}: {
  candidates: [number, number][];
}): Action => {
  return {
    type: actionTypes.GET_CANDIDATES,
    payload: { candidates },
  };
};

export const promote = ({
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

export const promotionDone = ({
  newPositions,
}: {
  newPositions: string[][];
}): Action => {
  return {
    type: actionTypes.PROMOTION_DONE,
    payload: { newPositions },
  };
};
