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
});

export const SudokuProvider = ({ children }) => {
  let [numberSelected, setNumberSelected] = useState("0");
  let [gameArray, setGameArray] = useState([]);
  let [fastMode, setFastMode] = useState(false);
  let [cellSelected, setCellSelected] = useState(-1);
  let [currentArray, setCurrentArray] = useState([]);

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
