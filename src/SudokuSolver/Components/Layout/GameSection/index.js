import PropTypes from "prop-types";
import React from "react";
import { useSudokuContext } from "../../../Context/SudokuContext";
import { Message } from "../Message";

/**
 * React component for the Game Section
 */
export const GameSection = ({ onClick, onKeyDown, message }) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let { gameArray, cellSelected } = useSudokuContext();

  /**
   * Cell Highlight Method 1: Highlight all cells
   * related to current cell. By related, I mean all
   * cells in the same row/column/box as the current cell.
   *
   * row: number
   * column: number
   */
  // eslint-disable-next-line
  const _isCellRelatedToSelectedCell = (row, column) => {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    let rowOfSelectedCell = Math.floor(cellSelected / 9);
    let columnOfSelectedCell = cellSelected % 9;
    if (rowOfSelectedCell === row || columnOfSelectedCell === column) {
      return true;
    }
    return [
      [0, 3, 0, 3],
      [0, 3, 3, 6],
      [0, 3, 6, 9],
      [3, 6, 0, 3],
      [3, 6, 3, 6],
      [3, 6, 6, 9],
      [6, 9, 0, 3],
      [6, 9, 3, 6],
      [6, 9, 6, 9],
    ].some((array) => {
      if (
        rowOfSelectedCell > array[0] - 1 &&
        row > array[0] - 1 &&
        rowOfSelectedCell < array[1] &&
        row < array[1] &&
        columnOfSelectedCell > array[2] - 1 &&
        column > array[2] - 1 &&
        columnOfSelectedCell < array[3] &&
        column < array[3]
      )
        return true;
      return false;
    });
  };

  /**
   * Cell Highlight Method 2: Highlight all cells with
   * the same number as in the current cell.
   *
   * row: number
   * column: number
   */
  const _isCellSameAsSelectedCell = (row, column) => {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    if (gameArray[cellSelected] === "0") {
      return false;
    }
    if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
      return true;
    }
  };

  /**
   * Returns the classes for a cell related to the selected cell.
   *
   * indexOfArray: number
   * value: string
   * highlight: string
   */
  function _selectedCell(indexOfArray, value, highlight) {
    if (value !== "0") {
      if (gameArray[indexOfArray] === "0") {
        return (
          <td
            className={`game__cell game__cell--userfilled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => onClick(indexOfArray)}
            onKeyDown={(event) => onKeyDown(event)}
            tabIndex={-1}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className={`game__cell game__cell--filled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => onClick(indexOfArray)}
            onKeyDown={(event) => onKeyDown(event)}
            tabIndex={-1}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className={`game__cell game__cell--${highlight}selected`}
          key={indexOfArray}
          onClick={() => onClick(indexOfArray)}
          onKeyDown={(event) => onKeyDown(event)}
          tabIndex={-1}
        >
          {value}
        </td>
      );
    }
  }

  /**
   * Returns the classes or a cell not related to the selected cell.
   *
   * indexOfArray: number
   * value: string
   */
  const _unselectedCell = (indexOfArray, value) => {
    if (value !== "0") {
      if (gameArray[indexOfArray] === "0") {
        return (
          <td
            className="game__cell game__cell--userfilled"
            key={indexOfArray}
            onClick={() => onClick(indexOfArray)}
            onKeyDown={(event) => onKeyDown(event)}
            tabIndex={-1}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className="game__cell game__cell--filled"
            key={indexOfArray}
            onClick={() => onClick(indexOfArray)}
            onKeyDown={(event) => onKeyDown(event)}
            tabIndex={-1}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className="game__cell"
          key={indexOfArray}
          onClick={() => onClick(indexOfArray)}
          onKeyDown={(event) => onKeyDown(event)}
          tabIndex={-1}
        >
          {value}
        </td>
      );
    }
  };

  return (
    <section className="game">
      <table className="game__board">
        <tbody>
          {rows.map((row) => {
            return (
              <tr className="game__row" key={row}>
                {rows.map((column) => {
                  const indexOfArray = row * 9 + column;
                  const value = gameArray[indexOfArray];

                  if (cellSelected === indexOfArray) {
                    return _selectedCell(indexOfArray, value, "highlight");
                  }

                  if (
                    cellSelected !== -1 &&
                    (_isCellSameAsSelectedCell(row, column) ||
                      _isCellRelatedToSelectedCell(row, column))
                  ) {
                    return _selectedCell(indexOfArray, value, "");
                  } else {
                    return _unselectedCell(indexOfArray, value);
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Message message={message}/>
    </section>
  );
};

GameSection.propTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  message: PropTypes.string
};
