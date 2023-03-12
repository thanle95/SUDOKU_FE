import React, { useState, useEffect } from "react";
import moment from "moment";
import { Header } from "../Layout/Header";
import { GameSection } from "../Layout/GameSection";
import { StatusSection } from "../Layout/StatusSection";
import { Footer } from "../Layout/Footer";
import { useSudokuContext } from "../../Context/SudokuContext";
import { getUniqueSudoku } from "../../Solver/UniqueSudoku";



/**
 * Game is the main React component.
 */
export const Game = () => {
  /**
   * All the variables for holding state:
   * gameArray: Holds the current state of the game.
   * initArray: Holds the initial state of the game.
   * solvedArray: Holds the solved position of the game.
   * difficulty: Difficulty level - 'Easy', 'Medium' or 'Hard'
   * numberSelected: The Number selected in the Status section.
   * timeGameStarted: Time the current game was started.
   * mistakesMode: Is Mistakes allowed or not?
   * fastMode: Is Fast Mode enabled?
   * cellSelected: If a game cell is selected by the user, holds the index.
   * history: history of the current game, for 'Undo' purposes.
   * overlay: Is the 'Game Solved' overlay enabled?
   * won: Is the game 'won'?
   */
  let {
    numberSelected,
    setNumberSelected,
    gameArray,
    setGameArray,
    difficulty,
    setDifficulty,
    setTimeGameStarted,
    fastMode,
    setFastMode,
    cellSelected,
    setCellSelected,
    initArray,
    setInitArray,
    setWon,
  } = useSudokuContext();
  let [mistakesMode, setMistakesMode] = useState(false);
  let [history, setHistory] = useState([]); //[][]
  let [solvedArray, setSolvedArray] = useState([]);
  let [overlay, setOverlay] = useState(false);

  /**
   * Creates a new game and initializes the state variables.
   * @param {
   * e: change event
   * }
   */
  const _createNewGame = (e) => {
    let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(
      difficulty,
      e
    );

    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected("0");
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
    setWon(false);
  };

  /**
   * Checks if the game is solved.
   * @param {
   * index: number,
   * value: string
   * }
   */
  const _isSolved = (index, value) => {
    /**
     * @param {
     * cell: string,
     * cellIndex: number
     * }
     */
    if (
      gameArray.every((cell, cellIndex) => {
        if (cellIndex === index) return value === solvedArray[cellIndex];
        else return cell === solvedArray[cellIndex];
      })
    ) {
      return true;
    }
    return false;
  };

  /**
   * Fills the cell with the given 'value'
   * Used to Fill / Erase as required.
   * @param {
   * index: number,
   * value: string
   * }
   */
  const _fillCell = (index, value) => {
    if (initArray[index] === "0") {
      // Direct copy results in interesting set of problems, investigate more!
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();

      // Can't use tempArray here, due to Side effect below!!
      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
        setOverlay(true);
        setWon(true);
      }
    }
  };

  /**
   * A 'user fill' will be passed on to the
   * @param {
   * index: number,
   * value: string
   * }
   */
  const _userFillCell = (index, value) => {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      } else {
        // TODO: Flash - Mistakes not allowed in Mistakes Mode
      }
    } else {
      _fillCell(index, value);
    }
  };

  /**
   * On Click of 'New Game' link,
   * create a new game.
   */
  const onClickNewGame = () => {
    _createNewGame();
  };

  /**
   * On Click of a Game cell.
   * @param {
   * indexOfArray: index
   * }
   */
  const onClickCell = (indexOfArray) => {
    if (fastMode && numberSelected !== "0") {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  };

  /**
   * On Change Difficulty,
   * 1. Update 'Difficulty' level
   * 2. Create New Game
   * @param {
   * e: change event
   * }
   */
  const onChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
    _createNewGame(e);
  };

  /**
   * On Click of Number in Status section,
   * either fill cell or set the number.
   * @paran {
   * number: string
   * }
   */
  const onClickNumber = (number) => {
    if (fastMode) {
      setNumberSelected(number);
    } else if (cellSelected !== -1) {
      _userFillCell(cellSelected, number);
    }
  };

  /**
   * On Click Undo,
   * try to Undo the latest change.
   */
  const onClickUndo = () => {
    if (history.length) {
      let tempHistory = history.slice();
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      if (tempArray !== undefined) setGameArray(tempArray);
    }
  };

  /**
   * On Click Erase,
   * try to delete the cell.
   */
  const onClickErase = () => {
    if (cellSelected !== -1 && gameArray[cellSelected] !== "0") {
      _fillCell(cellSelected, "0");
    }
  };

  /**
   * On Click Hint,
   * fill the selected cell if its empty or wrong number is filled.
   */
  const onClickHint = () => {
    if (cellSelected !== -1) {
      _fillCell(cellSelected, solvedArray[cellSelected]);
    }
  };

  /**
   * Toggle Mistakes Mode
   */
  const onClickMistakesMode = () => {
    setMistakesMode(!mistakesMode);
  };

  /**
   * Toggle Fast Mode
   */
  const onClickFastMode = () => {
    if (fastMode) {
      setNumberSelected("0");
    }
    setCellSelected(-1);
    setFastMode(!fastMode);
  };

  /**
   * Close the overlay on Click.
   */
  const onClickOverlay = () => {
    setOverlay(false);
    _createNewGame();
  };

  /**
   * On load, create a New Game.
   */
  useEffect(() => {
    _createNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={overlay ? "container blur" : "container"}>
        <Header onClick={onClickNewGame} />
        <div className="innercontainer">
          <GameSection onClick={(indexOfArray) => onClickCell(indexOfArray)} />
          <StatusSection
            onClickNumber={(number) => onClickNumber(number)}
            onChange={(e) => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickMistakesMode={onClickMistakesMode}
            onClickFastMode={onClickFastMode}
          />
        </div>
        <Footer />
      </div>
      <div
        className={overlay ? "overlay overlay--visible" : "overlay"}
        onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          You <span className="overlay__textspan1">solved</span>{" "}
          <span className="overlay__textspan2">it!</span>
        </h2>
      </div>
    </>
  );
};
