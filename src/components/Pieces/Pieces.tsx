import { useRef } from "react";
import { files, filesNumbers, ranks } from "../../Data/data";
import Piece from "./Piece";
import { useAppContext } from "../../context/AppContext";
import { makeNewMove } from "../../reducer/actions/move";

const Pieces = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { appState, dispatch } = useAppContext();

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
    const { x, y } = getCoordinates(e);
    const data = e.dataTransfer.getData("data");
    const [piece, fileNumber, rank] = data.split(",");
    const newPositions = appState.positions;
    newPositions[Number(rank) - 1][Number(fileNumber) - 1] = "";
    newPositions[y - 1][x - 1] = piece;
    dispatch(makeNewMove({ newPositions }));
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
                <div key={file + rank} className=" square">
                  {appState.positions[rank - 1][filesNumbers[index] - 1] ===
                  "" ? (
                    ""
                  ) : (
                    <Piece
                      fileNumber={filesNumbers[index]}
                      rank={rank}
                      piece={
                        appState.positions[rank - 1][filesNumbers[index] - 1]
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
