import { files, filesNumbers, ranks } from "../../Data/ranksAndFiles";
import wq from "../../assets/wq.png";
import wn from "../../assets/wn.png";
import wr from "../../assets/wr.png";
import wb from "../../assets/wb.png";
import bq from "../../assets/bq.png";
import bn from "../../assets/bn.png";
import br from "../../assets/br.png";
import bb from "../../assets/bb.png";
import { useAppContext } from "../context/AppContext";
import { performPromotion } from "../../arbiter/performMove";
const piecesObject: { [k: string]: string } = {
  wb: wb,
  wn: wn,
  wr: wr,
  wq: wq,
  bb: bb,
  bn: bn,
  br: br,
  bq: bq,
};

const PromotionBox = () => {
  const {
    appState: {
      counter,
      positions,
      turn,
      isPromotion,
      castle,
      positionsHistory,
      promotion: { x: promotionFile, y: promotionRank },
    },
    dispatch,
  } = useAppContext();
  const promotionPiecesWhite = ["", "", "", "", "wb", "wr", "wn", "wq"];
  const promotionPiecesBlack = ["bq", "bn", "br", "bb", "", "", "", ""];
  const promotionPieces =
    turn === "w" ? promotionPiecesWhite : promotionPiecesBlack;

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    performPromotion({
      x: promotionFile,
      y: promotionRank,
      piece: target.id as string,
      positions: positions[positions.length - 1],
      dispatch,
      turn,
      counter,
      castle,
      positionsHistory,
    });
  };

  return (
    <div className={`${isPromotion ? "relative z-20 board" : "hidden"}`}>
      {ranks.map((rank) => {
        return (
          <div className="rank" key={rank}>
            {files.map((_, fileIndex) => {
              return (
                <div className="square" key={fileIndex + 1}>
                  {promotionPieces[rank - 1] &&
                  filesNumbers[fileIndex] === promotionFile ? (
                    <div className="promotionImageContainer group">
                      {promotionPieces[rank - 1] ? (
                        <img
                          className="promotionImage group-hover:max-w-full"
                          src={piecesObject[promotionPieces[rank - 1]]}
                          alt={promotionPieces[rank - 1]}
                          onClick={handleClick}
                          id={promotionPieces[rank - 1]}
                        />
                      ) : (
                        ""
                      )}
                    </div>
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

export default PromotionBox;
