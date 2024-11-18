import Board from "./components/Board/Board";
import AppContext from "./components/context/AppContext";
import Control from "./components/Control/Control";
import Pieces from "./components/Pieces/Pieces";
import PopUp from "./components/PopUp/PopUp";
import PromotionBox from "./components/PromotionBox/PromotionBox";

const App = () => {
  return (
    <AppContext>
      <div className="container relative flex items-center justify-center min-h-screen mx-auto">
        <div className="grid">
          <Board />
          <Pieces />
          <PromotionBox />
        </div>
        <Control />
        <PopUp />
      </div>
    </AppContext>
  );
};

export default App;
