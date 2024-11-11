import wp from "../../assets/wp.png";
import wb from "../../assets/wb.png";
import wn from "../../assets/wn.png";
import wr from "../../assets/wr.png";
import wq from "../../assets/wq.png";
import wk from "../../assets/wk.png";
import bp from "../../assets/bp.png";
import bb from "../../assets/bb.png";
import bn from "../../assets/bn.png";
import br from "../../assets/br.png";
import bq from "../../assets/bq.png";
import bk from "../../assets/bk.png";
import { getMoves } from "../../arbiter/getMoves";
import { getCandidates } from "../../Reducer/actions";
import { useAppContext } from "../context/AppContext";
const piecesObject: { [k: string]: string } = {
  wp: wp,
  wb: wb,
  wn: wn,
  wr: wr,
  wq: wq,
  wk: wk,
  bp: bp,
  bb: bb,
  bn: bn,
  br: br,
  bq: bq,
  bk: bk,
};

const Piece = ({
  piece,
  fileNumber,
  rank,
}: {
  piece: string;
  fileNumber: number;
  rank: number;
}) => {
  const {
    appState: { positions, turn, castle, isKingChecked },
    dispatch,
  } = useAppContext();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("data", `${piece},${fileNumber},${rank}`);
    e.dataTransfer.effectAllowed = "move";
    (e.target as HTMLElement).style.opacity = "0.4";
    if (piece[0] === turn) {
      const moves = getMoves({
        piece,
        file: fileNumber,
        rank,
        positions,
        turn,
        castle,
        isKingChecked,
      });
      dispatch(getCandidates({ candidates: moves }));
    }
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        const target = e.target as HTMLElement;
        target.style.opacity = "1";
        dispatch(getCandidates({ candidates: [] }));
      }}
      draggable="true"
      className="pieceImageContainer"
    >
      <img className="pieceImage" src={piecesObject[piece]} alt={piece} />
    </div>
  );
};

export default Piece;
