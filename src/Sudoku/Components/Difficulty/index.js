import React from 'react';
import PropTypes from 'prop-types';
import { useSudokuContext } from '../../Context/SudokuContext';

/**
 * React component for the Difficulty Selector.
 */
export const Difficulty = ({onChange}) => {
  let { difficulty } = useSudokuContext();

  return (
    <div className="status__difficulty">
      <span className="status__difficulty-text">Difficulty:&nbsp;&nbsp;</span>
      <select name="status__difficulty-select" className="status__difficulty-select" defaultValue={difficulty} onChange={onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}
Difficulty.propTypes = {
    onChange: PropTypes.func,
}