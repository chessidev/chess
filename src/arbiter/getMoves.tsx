interface GetMoves {
  piece: string;
  rank: number;
  file: number;
  positions: string[][];
  turn: string;
}

export const getMoves = (params: GetMoves) => {
  switch (params.piece[1]) {
    case "r": {
      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ];
      return calcMoves(params, directions, "board");
    }
    case "b": {
      const directions = [
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
      ];
      return calcMoves(params, directions, "board");
    }
    case "n": {
      const directions = [
        [1, 2],
        [-1, 2],
        [1, -2],
        [-1, -2],
        [2, 1],
        [-2, 1],
        [-2, -1],
        [2, -1],
      ];
      return calcMoves(params, directions, "step");
    }
    case "q": {
      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
      ];
      return calcMoves(params, directions, "board");
    }
    case "k": {
      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
      ];
      return calcMoves(params, directions, "step");
    }
    case "p": {
      const directions = params.turn === "w" ? [[0, 1]] : [[0, -1]];
      return calcPawnMoves(params, directions);
    }
    default:
      return [];
  }
};

const calcMoves = (
  { rank, file, positions, turn }: GetMoves,
  directions: number[][],
  range: "step" | "board"
) => {
  const moves: [number, number][] = [];
  const enemy = turn === "w" ? "b" : "w";
  const step = range === "step" ? 2 : 8;
  directions.forEach(([x, y]) => {
    for (let i = 1; i < step; i++) {
      const newFile = file + i * x;
      const newRank = rank + i * y;
      if (
        newFile < 1 ||
        newFile > 8 ||
        newRank < 1 ||
        newRank > 8 ||
        positions[newRank - 1]?.[newFile - 1]?.[0] === turn
      ) {
        break;
      }
      if (positions[newRank - 1]?.[newFile - 1] === "") {
        moves.push([newFile, newRank]);
      } else if (positions[newRank - 1]?.[newFile - 1]?.[0] === enemy) {
        moves.push([newFile, newRank]);
        break;
      }
    }
  });
  return moves;
};

const calcPawnMoves = (
  { rank, file, positions, turn }: GetMoves,
  directions: number[][]
) => {
  const moves: [number, number][] = [];
  const enemy = turn === "w" ? "b" : "w";
  const step = rank === (turn === "w" ? 2 : 7) ? 3 : 2;
  directions.forEach(([x, y]) => {
    for (let i = 1; i < step; i++) {
      const newFile = file + i * x;
      const newRank = rank + i * y;
      if (positions[newRank - 1]?.[newFile - 1] === "") {
        moves.push([newFile, newRank]);
      }
    }
  });

  if (
    positions[rank + (turn === "w" ? 1 : -1) - 1]?.[file + 1 - 1]?.[0] === enemy
  ) {
    moves.push([file + 1, rank + (turn === "w" ? 1 : -1)]);
  }

  return moves;
};
