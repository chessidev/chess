import { actionTypes } from "../Data/data";

export type State = {
  positions: string[][];
  turn: string;
  counter: number;
};

export type Action = {
  type: string;
  payload: {
    newPositions: string[][];
  };
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE:
      return {
        ...state,
        turn: state.turn === "w" ? "b" : "w",
        positions: action.payload.newPositions,
        counter: state.turn === "w" ? state.counter : state.counter + 1,
      };
    default:
      return state;
  }
};
