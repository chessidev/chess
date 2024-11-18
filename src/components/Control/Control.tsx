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
    dispatch(claimDraw());
  };

  const button = useRef<HTMLButtonElement>(null);

  if (button.current) {
    if (
      gameStatus === Status.threefoldRepetition ||
      gameStatus === Status.fiftyMoveRule
    ) {
      button.current.disabled = false;
    } else button.current.disabled = true;
  }

  return (
    <div className="h-[600px] px-4 md:flex hidden flex-col justify-between">
      <div className="notation h-[50%]"></div>
      <div>
        <button ref={button} onClick={clickHandler} disabled>
          Claim Draw
        </button>
      </div>
    </div>
  );
};

export default Control;
