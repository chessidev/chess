import { Dispatch, ReactNode } from "react";

interface State {
  positions: string[][][];
  turn: string;
  counter: number;
  candidates: [number, number][];
}
interface Action {
  type: string;
  payload: {
    newPositions?: string[][];
    candidates?: [number, number][];
  };
}
interface GetMoves {
  piece: string;
  rank: number;
  file: number;
  positions: string[][][];
  turn: string;
}
interface AppContextProps {
  children: ReactNode;
}

interface AppProviderValue {
  appState: State;
  dispatch: Dispatch<Action>;
}

export type { GetMoves, AppContextProps, AppProviderValue, State, Action };
