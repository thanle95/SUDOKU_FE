import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SudokuContext = createContext({
  numberSelected: "0",
  setNumberSelected: () => {},
  gameArray: [],
  setGameArray: () => {},
  cellSelected: -1,
  setCellSelected: () => {},
  currentArray: [],
  setCurrentArray: () => {},
  showHistory: 0,
  setShowHistory: () => {},
});

export const SudokuProvider = ({ children }) => {
  const [numberSelected, setNumberSelected] = useState("0");
  const [gameArray, setGameArray] = useState([]);
  const [fastMode, setFastMode] = useState(false);
  const [cellSelected, setCellSelected] = useState(-1);
  const [currentArray, setCurrentArray] = useState([]);
  const [showHistory, setShowHistory] = useState(0);

  return (
    <SudokuContext.Provider
      value={{
        numberSelected,
        setNumberSelected,
        gameArray,
        setGameArray,
        fastMode,
        setFastMode,
        cellSelected,
        setCellSelected,
        currentArray,
        setCurrentArray,
        showHistory,
        setShowHistory,
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
