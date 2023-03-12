import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const SudokuContext = createContext({
  numberSelected: "0",
  setNumberSelected: () => {},
  gameArray: [],
  setGameArray: () => {},
  timeGameStarted: moment(),
  setTimeGameStarted: () => {},
  cellSelected: -1,
  setCellSelected: () => {},
  initArray: [],
  setInitArray: () => {},
  currentArray: [],
  setCurrentArray: () => {},
  won: false,
  setWon: () => {},
});

export const SudokuProvider = ({ children }) => {
  let [numberSelected, setNumberSelected] = useState("0");
  let [gameArray, setGameArray] = useState([]);
  let [difficulty, setDifficulty] = useState("Easy");
  let [timeGameStarted, setTimeGameStarted] = useState(moment());
  let [fastMode, setFastMode] = useState(false);
  let [cellSelected, setCellSelected] = useState(-1);
  let [initArray, setInitArray] = useState([]);
  let [currentArray, setCurrentArray] = useState([]);
  let [won, setWon] = useState(false);

  return (
    <SudokuContext.Provider
      value={{
        numberSelected,
        setNumberSelected,
        gameArray,
        setGameArray,
        difficulty,
        setDifficulty,
        timeGameStarted,
        setTimeGameStarted,
        fastMode,
        setFastMode,
        cellSelected,
        setCellSelected,
        initArray,
        setInitArray,
        currentArray,
        setCurrentArray,
        won,
        setWon,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = () => useContext(SudokuContext);

// Usage
// const { numberSelected, setNumberSelected } = useNumberValue();
SudokuProvider.propTypes = {
  children: PropTypes.element,
};
