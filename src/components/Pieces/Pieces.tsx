import { useRef } from "react";
import { files, filesNumbers, ranks } from "../../Data/ranksAndFiles";
import Piece from "./Piece";
import { useAppContext } from "../context/AppContext";
import { performMove } from "../../arbiter/performMove";

const Pieces = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { appState, dispatch } = useAppContext();
  const { candidates, turn, positions } = appState;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getCoordinates = (e: React.DragEvent) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const { width, left, top } = rect;
    return {
      x: Math.floor((e.clientX - left) / (width / 8)) + 1,
      y: 8 - Math.floor((e.clientY - top) / (width / 8)),
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const data = e.dataTransfer.getData("data");
    const { x, y } = getCoordinates(e);
    performMove({
      data,
      x,
      y,
      positions: positions[positions.length - 1],
      candidates,
      turn,
      dispatch,
    });
  };

  const getClassName = (x: number, y: number) => {
    if (
      candidates.find((candidate) => candidate[0] === x && candidate[1] === y)
    ) {
      if (positions[positions.length - 1][y - 1][x - 1] === "")
        return "highlight";
      else return "attack";
    } else return "";
  };

  return (
    <div
      ref={boardRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative z-10 board"
    >
      {ranks.map((rank) => {
        return (
          <div key={rank} className="rank">
            {files.map((file, index) => {
              return (
                <div
                  key={file + rank}
                  className={`square ${getClassName(
                    filesNumbers[index],
                    rank
                  )}`}
                >
                  {positions[positions.length - 1][rank - 1][
                    filesNumbers[index] - 1
                  ] === "" ? (
                    ""
                  ) : (
                    <Piece
                      fileNumber={filesNumbers[index]}
                      rank={rank}
                      piece={
                        positions[positions.length - 1][rank - 1][
                          filesNumbers[index] - 1
                        ]
                      }
                    />
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
