import React from 'react';
import PropTypes from 'prop-types';


/**
 * React component for the Mistakes Mode / Fast Mode
 * elements in the Status Section.
 */
export const Mode = ({mode, onClickMode}) => {
  return (
    <div className={ mode === 'mistakes'
                      ? "status__action-mistakes-mode"
                      : "status__action-fast-mode"}>
      <label className={ mode === 'mistakes'
                          ? "status__action-mistakes-mode-switch"
                          : "status__action-fast-mode-switch"}>
        <input type="checkbox" />
        <span className={ mode === 'mistakes'
                            ? "status__action-mistakes-mode-slider"
                            : "status__action-fast-mode-slider"}
              onClick={onClickMode}
        ></span>
      </label>
      <p className="status__action-text">{ mode === 'mistakes'
                  ? 'Mistakes Mode'
                  : 'Fast Mode'}</p>
    </div>
  )
}
Mode.propTypes = {
    mode: PropTypes.string,
    onClickMode: PropTypes.func
}