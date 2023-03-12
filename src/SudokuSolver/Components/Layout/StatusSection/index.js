import React from 'react';

import PropTypes from 'prop-types';
import { Numbers } from '../../Number';

/**
 * React component for the Status Section.
 */
export const StatusSection = (props) => {
  return (
    <section className="status">
      {/* <Difficulty onChange={props.onChange} />
      <Timer /> */}
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      {/* <div className="status__actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='hint' onClickAction={props.onClickHint} />
        <Mode mode='mistakes' onClickMode={props.onClickMistakesMode} />
        <Mode mode='fast' onClickMode={props.onClickFastMode} />
      </div> */}
    </section>
  )
}

StatusSection.propTypes = {
    onClickNumber: PropTypes.func,
    onClickUndo: PropTypes.func,
    onClickErase: PropTypes.func,
    onClickResolve: PropTypes.func,
}