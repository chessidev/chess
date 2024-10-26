import { Dispatch, ReactNode } from "react";

interface State {
  positions: string[][][];
  turn: "w" | "b";
  counter: number;
  candidates: [number, number][];
  isPromotion: boolean;
  promotion: {
    x: number;
    y: number;
  };
}
interface Action {
  type: string;
  payload: {
    newPositions?: string[][];
    candidates?: [number, number][];
    promotion?: {
      x: number;
      y: number;
    };
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
interface performMoveParam {
  data: string;
  x: number;
  y: number;
  positions: string[][];
  candidates: [number, number][];
  turn: "w" | "b";
  dispatch: (arg0: Action) => void;
}
interface PromotionParam {
  x: number;
  y: number;
  piece: string;
  positions: string[][];
  dispatch: (arg0: Action) => void;
}

export type {
  GetMoves,
  AppContextProps,
  AppProviderValue,
  State,
  Action,
  performMoveParam,
  PromotionParam,
};
