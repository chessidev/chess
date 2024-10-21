import { actionTypes } from "../Data/actionTypes";
import { Action, State } from "../Data/interfaces";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.NEW_MOVE:
      if (!action.payload.newPositions) {
        return state;
      } else
        return {
          ...state,
          turn: state.turn === "w" ? "b" : "w",
          positions: [...state.positions, action.payload.newPositions],
          counter: state.turn === "w" ? state.counter : state.counter + 1,
        };

    case actionTypes.GET_CANDIDATES: {
      return {
        ...state,
        candidates: action.payload.candidates || [],
      };
    }

    default:
      return state;
  }
};
