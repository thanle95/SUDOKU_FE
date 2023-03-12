import "./App.css";
import { Game } from "./SudokuSolver/Components/Game";
import { SudokuProvider } from "./SudokuSolver/Context/SudokuContext";
// import { Game } from "./Sudoku/Components/Game";
// import { SudokuProvider } from "./Sudoku/Context/SudokuContext";
function App() {
  return (
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  );
}

export default App;
