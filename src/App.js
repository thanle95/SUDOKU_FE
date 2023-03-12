import "./App.css";
import { Game } from "./Components/Game";
import { SudokuProvider } from "./Context/SudokuContext";

function App() {
  return (
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  );
}

export default App;
