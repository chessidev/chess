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
