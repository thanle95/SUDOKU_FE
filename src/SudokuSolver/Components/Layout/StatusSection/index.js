import React from 'react';

import PropTypes from 'prop-types';
import { Numbers } from '../../Number';
import { Action } from '../../Action';

/**
 * React component for the Status Section.
 */
export const StatusSection = (props) => {
  return (
    <section className="status">
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      <div className="status__actions">
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='solve' onClickAction={props.onClickSolve} />
        <Action action='history' onClickAction={props.onClickViewHistory} />
      </div>
    </section>
  )
}

StatusSection.propTypes = {
    onClickNumber: PropTypes.func,
    onClickErase: PropTypes.func,
    onClickSolve: PropTypes.func,
    onClickViewHistory: PropTypes.func,
}