import Board from "./components/Board/Board";
import Pieces from "./components/Pieces/Pieces";

const App = () => {
  return (
    <div className="container relative mx-auto">
      <Board />
      <Pieces />
    </div>
  );
};

export default App;
