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
    case "NEW_MOVE":
      return {
        ...state,
        turn: state.turn === "w" ? "b" : "w",
        positions: action.payload.newPositions,
      };
    default:
      return state;
  }
};
