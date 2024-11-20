import { useEffect, useRef } from "react";
import { files, filesNumbers, ranks } from "../../Data/ranksAndFiles";
import Piece from "./Piece";
import { useAppContext } from "../context/AppContext";
import { performMove } from "../../arbiter/performMove";
import { changeStatus, isKingInCheck } from "../../Reducer/actions";
import { getIsKingInCheck } from "../../arbiter/kingSafety";
import { getGameStatus } from "../../arbiter/getGameStatus";

const Pieces = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const { appState, dispatch } = useAppContext();
  const {
    candidates,
    turn,
    positions,
    gameStatus,
    castle,
    counter,
    draw50,
    enPassantSquares,
    positionsHistory,
    unclaimedRepetition,
  } = appState;

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
      positions,
      candidates,
      turn,
      castle: appState.castle,
      dispatch,
      counter: appState.counter,
      enPassantSquares,
      positionsHistory,
    });
  };

  const getClassName = (x: number, y: number) => {
    let className = "";
    if (
      candidates.find((candidate) => candidate[0] === x && candidate[1] === y)
    ) {
      if (positions[positions.length - 1][y - 1][x - 1] === "")
        className += " highlight";
      else className += " attack";
    }
    if (
      positions[positions.length - 1][y - 1][x - 1] === `${turn}k` &&
      appState.isKingChecked
    ) {
      className += " check";
    }
    return className;
  };

  useEffect(() => {
    const currentPosition = positions[positions.length - 1];
    const isKingChecked = getIsKingInCheck({
      currentPosition,
      turn,
    });

    if (isKingChecked !== appState.isKingChecked)
      dispatch(isKingInCheck({ isKingChecked }));

    const status = getGameStatus({
      isKingChecked,
      positions,
      turn,
      castle,
      draw50,
      counter,
      positionsHistory,
      unclaimedRepetition,
      dispatch,
    });
    if (status !== gameStatus) dispatch(changeStatus({ gameStatus: status }));
  }, [turn]);

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
