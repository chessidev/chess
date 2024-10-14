const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const filesNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const startingPositions = new Array(8)
  .fill("")
  .map(() => new Array(8).fill(""));
startingPositions[0] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
startingPositions[1] = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
startingPositions[6] = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
startingPositions[7] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
const initialState = {
  positions: startingPositions,
  turn: "w",
  counter: 1,
};
export { ranks, files, filesNumbers, startingPositions, initialState };
