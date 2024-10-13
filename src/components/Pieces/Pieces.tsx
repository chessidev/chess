import { useRef, useState } from "react";
import { files, filesNumbers, ranks, startingPositions } from "../Shared/data";
import Piece from "./Piece";

const Pieces = () => {
  const [Positions, setPositions] = useState(startingPositions);
  const boardRef = useRef<HTMLDivElement>(null);

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
    Positions[Number(rank) - 1][Number(fileNumber) - 1] = "";
    Positions[y - 1][x - 1] = piece;
    setPositions([...Positions]);
    console.log(Positions);
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
                  {Positions[rank - 1][filesNumbers[index] - 1] === "" ? (
                    ""
                  ) : (
                    <Piece
                      fileNumber={filesNumbers[index]}
                      rank={rank}
                      piece={Positions[rank - 1][filesNumbers[index] - 1]}
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
