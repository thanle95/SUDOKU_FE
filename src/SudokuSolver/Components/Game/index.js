import moment from "moment";
import React, { useEffect, useState } from "react";
import { post } from "../../APIs/service";
import calDuration from "../../Commons/Duration";
import { useSudokuContext } from "../../Context/SudokuContext";
import { Log } from "../../Models/Log";
import { checkError, solveSudoku } from "../../Solver/Sudoku";
import { GameSection } from "../Layout/GameSection";
import { Header } from "../Layout/Header";
import { History } from "../Layout/History";
import { StatusSection } from "../Layout/StatusSection";

import './style.css'
/**
 * Game is the main React component.
 */
export const Game = () => {
  /**
   * All the variables for holding state:
   * gameArray: Holds the current state of the game.
   * numberSelected: The Number selected in the Status section.
   * timeGameStarted: Time the current game was started.
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
    cellSelected,
    setCellSelected,
    currentArray,
    setCurrentArray,
    showHistory,
    setShowHistory,
  } = useSudokuContext();
  let [overlay, setOverlay] = useState(false);
  const [timerString, setTimerString] = useState("");
  const [message, setMessage] = useState("");
  /**
   * Creates a new game and initializes the state variables.
   * @param {
   * e: change event
   * }
   */
  const _createNewGame = (e) => {
    setGameArray(new Array(9 * 9).fill("0"));
    setCurrentArray(new Array(9 * 9).fill("0"));
    setNumberSelected("0");
    //todo: start when "solve" button clicked
    setCellSelected(-1);
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
    // Direct copy results in interesting set of problems, investigate more!
    let tempArray = [...gameArray];

    tempArray[index] = value;
    setGameArray(tempArray);
    setCurrentArray([...tempArray]);
    setMessage("");
  };

  /**
   * A 'user fill' will be passed on to the
   * @param {
   * index: number,
   * value: string
   * }
   */
  const _userFillCell = (index, value) => {
    _fillCell(index, value);
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
    if (numberSelected !== "0") {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  };

  /**
   *
   * @param {Event} event
   */
  const onKeyDownCell = (event) => {
    if (cellSelected !== -1) {
      const key = Number(event.key);
      if (!isNaN(key)) _userFillCell(cellSelected, key.toString());
    }
  };
  /**
   * On Click of Number in Status section,
   * either fill cell or set the number.
   * @param {
   * number: string
   * }
   */
  const onClickNumber = (number) => {
    if (cellSelected !== -1) {
      _userFillCell(cellSelected, number);
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
   * On Click solve,
   * automatically compute the missing numbers. If the Sudoku is not solvable, display an error message
   */

  const onClickSolve = async () => {
    //step 1: check if the given matrix is valid sudoku or not, from 1 to 9 and '0' (empty cell)
    const timeGameStarted = moment().utc(true);
    const error = checkError(currentArray);
    if (error.length) {
      setMessage(error);
      return;
    }

    //step 2: use recursive function to solve the sudoku matrix
    if (solveSudoku(currentArray)) {
      console.log("solve!!!");
      const timeGameSolved = moment().utc(true);
      console.log(timeGameSolved)
      setTimerString(calDuration(timeGameStarted, timeGameSolved));

      setOverlay(true);
      //
      const message = await post(
        "/api/Log",
        new Log(
          gameArray.join(""),
          currentArray.join(""),
          timeGameStarted.toDate(),
          timeGameSolved.toDate()
        )
      );
      console.log(message);

      setGameArray([...currentArray]);
    }
  };
  /**
   * Close the overlay on Click.
   */
  const onClickOverlay = () => {
    setOverlay(false);
    _createNewGame();
  };

  /**
   * Show the history on Click
   */
  const onClickViewHistory = () => {
    setShowHistory(showHistory + 1)
  };
  /**
   * On load, create a New Game.
   */
  useEffect(() => {
    _createNewGame();
    document.title = "Sudoku Solver!"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={overlay ? "container blur" : "container"}>
        <Header onClick={onClickNewGame} />
        <div className="innercontainer">
          <GameSection
            onClick={(indexOfArray) => onClickCell(indexOfArray)}
            onKeyDown={onKeyDownCell}
            message={message}
          />
          <StatusSection
            onClickNumber={(number) => onClickNumber(number)}
            onClickErase={onClickErase}
            onClickSolve={onClickSolve}
            onClickViewHistory={onClickViewHistory}
          />
        </div>
      </div>
      <div
        className={overlay ? "overlay overlay--visible" : "overlay"}
        onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          <span className="overlay__textspan1">Solved it</span>{" "}
          <span className="overlay__textspan2">in {timerString}!</span>
        </h2>
      </div>
      <History />
    </>
  );
};
