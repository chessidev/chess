import { State } from "./interfaces";

const startingPositions = new Array(8)
  .fill("")
  .map(() => new Array(8).fill(""));
startingPositions[0] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
startingPositions[1] = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
startingPositions[6] = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
startingPositions[7] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];

const initialState: State = {
  positions: [startingPositions],
  turn: "w",
  counter: 1,
  candidates: [],
  isPromotion: false,
  promotion: {
    x: 0,
    y: 0,
  },
};

export default initialState;
