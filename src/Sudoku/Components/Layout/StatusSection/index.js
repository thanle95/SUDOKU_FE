import React from 'react';

import PropTypes from 'prop-types';
import { Timer } from '../../Timer';
import { Difficulty } from '../../Difficulty';
import { Numbers } from '../../Number';
import { Action } from '../../Action';
import { Mode } from '../../Mode';

/**
 * React component for the Status Section.
 */
export const StatusSection = (props) => {
  return (
    <section className="status">
      <Difficulty onChange={props.onChange} />
      <Timer />
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      <div className="status__actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='hint' onClickAction={props.onClickHint} />
        <Mode mode='mistakes' onClickMode={props.onClickMistakesMode} />
        <Mode mode='fast' onClickMode={props.onClickFastMode} />
      </div>
    </section>
  )
}

StatusSection.propTypes = {
    onChange: PropTypes.func,
    onClickNumber: PropTypes.func,
    onClickUndo: PropTypes.func,
    onClickErase: PropTypes.func,
    onClickHint: PropTypes.func,
    onClickMistakesMode: PropTypes.func,
    onClickFastMode: PropTypes.func,
}