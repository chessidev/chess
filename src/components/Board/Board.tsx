const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const filesNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

const Board = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        {ranks.map((rank) => {
          return (
            <div key={rank} className="grid grid-cols-8">
              {files.map((file, index) => {
                return (
                  <div
                    key={file + rank}
                    className={`square ${
                      (filesNumbers[index] % 2 === 0 && rank % 2 === 0) ||
                      (filesNumbers[index] % 2 !== 0 && rank % 2 !== 0)
                        ? "bg-primary text-secondary"
                        : "bg-secondary text-primary"
                    }`}
                  >
                    {rank === 1 ? (
                      <span className="absolute sm:left-1 left-[1px] bottom-[1px] text-xs sm:bottom-1 sm:text-sm">
                        {file}
                      </span>
                    ) : (
                      ""
                    )}
                    {filesNumbers[index] === 8 ? (
                      <span className="absolute top-[1px] right-[1px] sm:right-1 sm:top-1 text-xs sm:text-sm">
                        {rank}
                      </span>
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
    </div>
  );
};

export default Board;
