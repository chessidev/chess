import Board from "./components/Board/Board";
import AppContext from "./components/context/AppContext";
import Pieces from "./components/Pieces/Pieces";

const App = () => {
  return (
    <AppContext>
      <div className="container relative flex items-center justify-center h-screen mx-auto">
        <div className="grid">
          <Board />
          <Pieces />
        </div>
      </div>
    </AppContext>
  );
};

export default App;
