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
          positions: [...state.positions, action.payload.newPositions],
          turn: state.turn === "w" ? "b" : "w",
          counter: state.turn === "w" ? state.counter : state.counter + 1,
        };

    case actionTypes.GET_CANDIDATES: {
      return {
        ...state,
        candidates: action.payload.candidates || [],
      };
    }

    case actionTypes.PROMOTE: {
      if (!action.payload.promotion || !action.payload.newPositions) {
        return state;
      } else
        return {
          ...state,
          isPromotion: true,
          promotion: action.payload.promotion,
          positions: [...state.positions, action.payload.newPositions],
        };
    }

    case actionTypes.PROMOTION_DONE: {
      if (!action.payload.newPositions) {
        return state;
      } else
        return {
          ...state,
          isPromotion: false,
          promotion: { x: 0, y: 0 },
          positions: [...state.positions, action.payload.newPositions],
          turn: state.turn === "w" ? "b" : "w",
          counter: state.turn === "w" ? state.counter : state.counter + 1,
        };
    }

    case actionTypes.UPDATE_CASTLE: {
      if (!action.payload.castle) {
        return state;
      } else
        return {
          ...state,
          castle: action.payload.castle,
        };
    }

    case actionTypes.IS_KING_CHECKED: {
      if (action.payload.isKingChecked === undefined) {
        return state;
      } else
        return {
          ...state,
          isKingChecked: action.payload.isKingChecked,
        };
    }

    default:
      return state;
  }
};
