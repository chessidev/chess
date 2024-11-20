import { useRef } from "react";
import { Status } from "../../Data/gameStatus";
import { useAppContext } from "../context/AppContext";
import { claimDraw } from "../../Reducer/actions";

const Control = () => {
  const {
    appState: { gameStatus },
    dispatch,
  } = useAppContext();

  const clickHandler = () => {
    console.log("claim draw clicked");

    dispatch(claimDraw());
  };

  const button = useRef<HTMLButtonElement>(null);

  const disabledHandler =
    gameStatus === Status.threefoldRepetition ||
    gameStatus === Status.fiftyMoveRule
      ? false
      : true;

  return (
    <div className="h-[600px] ml-4 md:flex hidden flex-col justify-between bg-primary/10">
      <div className="notation h-[50%]"></div>
      <div>
        <button ref={button} onClick={clickHandler} disabled={disabledHandler}>
          Claim Draw
        </button>
      </div>
    </div>
  );
};

export default Control;
