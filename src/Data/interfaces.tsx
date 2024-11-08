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
  castle: {
    w: {
      king: boolean;
      queen: boolean;
    };
    b: {
      king: boolean;
      queen: boolean;
    };
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
    castle?: {
      w: {
        king: boolean;
        queen: boolean;
      };
      b: {
        king: boolean;
        queen: boolean;
      };
    };
  };
}
interface GetMoves {
  piece: string;
  rank: number;
  file: number;
  positions: string[][][];
  turn: string;
  castle: {
    w: {
      king: boolean;
      queen: boolean;
    };
    b: {
      king: boolean;
      queen: boolean;
    };
  };
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
  castle: {
    w: {
      king: boolean;
      queen: boolean;
    };
    b: {
      king: boolean;
      queen: boolean;
    };
  };
  dispatch: (arg0: Action) => void;
}
interface PromotionParam {
  x: number;
  y: number;
  piece: string;
  positions: string[][];
  dispatch: (arg0: Action) => void;
}
interface castle {
  w: {
    king: boolean;
    queen: boolean;
  };
  b: {
    king: boolean;
    queen: boolean;
  };
}

export type {
  GetMoves,
  AppContextProps,
  AppProviderValue,
  State,
  Action,
  performMoveParam,
  PromotionParam,
  castle,
};
