import Board from "./components/Board/Board";
import Pieces from "./components/Pieces/Pieces";
import AppContext from "./context/AppContext";

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
