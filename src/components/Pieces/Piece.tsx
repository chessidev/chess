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

const Piece = ({ piece }: { piece: string }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img
        className="block object-cover w-full h-full"
        src={piecesObject[piece]}
        alt={piece}
      />
    </div>
  );
};

export default Piece;
