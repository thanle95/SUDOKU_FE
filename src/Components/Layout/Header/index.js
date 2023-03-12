import React from 'react';
import PropTypes from 'prop-types';


/**
 * React component for the Header Section.
 */
export const Header = ({onClick}) => {
  return (
    <header className="header">
      <h1>
        Su<span className="header__group-one">do</span><span className="header__group-two">ku</span>
      </h1>
      <h2 onClick={onClick}>
        New Game
      </h2>
    </header>
  )
}
Header.propTypes = {
    onClick: PropTypes.func
}