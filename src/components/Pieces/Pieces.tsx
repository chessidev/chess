import { files, filesNumbers, ranks } from "../Shared/data";
import Piece from "./Piece";

const Positions = new Array(8).fill("").map(() => new Array(8).fill(""));
Positions[0] = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
Positions[1] = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
Positions[6] = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
Positions[7] = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];

const Pieces = () => {
  return (
    <div className="absolute top-0 left-0 board">
      {ranks.map((rank) => {
        return (
          <div key={rank} className="rank">
            {files.map((file, index) => {
              return (
                <div key={file + rank} className="z-10 square">
                  {Positions[rank - 1][filesNumbers[index] - 1] !== "" ? (
                    <Piece
                      piece={Positions[rank - 1][filesNumbers[index] - 1]}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Pieces;
