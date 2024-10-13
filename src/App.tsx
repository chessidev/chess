import Board from "./components/Board/Board";
import Pieces from "./components/Pieces/Pieces";

const App = () => {
  return (
    <div className="container relative flex items-center justify-center h-screen mx-auto">
      <div className="grid">
        <Board />
        <Pieces />
      </div>
    </div>
  );
};

export default App;
