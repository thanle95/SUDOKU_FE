import PropTypes from "prop-types";
import React from "react";
import {
  HiOutlineClock,
  HiOutlineLightBulb,
  HiOutlineTrash,
} from "react-icons/hi2";
/**
 * Return the Icon of the Action buttons in the Status Section.
 */
const Icon = ({ action }) => {
  const SIZE = 25;
  if (action === "erase") {
    return <HiOutlineTrash size={SIZE} />;
  } else if (action === "solve") {
    return <HiOutlineLightBulb size={SIZE} />;
  } else if (action === "history") {
    return <HiOutlineClock size={SIZE} />;
  } else {
    return null;
  }
};

/**
 * React component for the Action buttons in the Status Section.
 */
export const Action = ({ action, onClickAction }) => {
  return (
    <div
      className={
       `btn ${ action === "erase"
       ? "status__action-erase"
       : action === "solve"
       ? "status__action-solve"
       : action === "history"
       ? "status__action-history"
       : ""} `
      }
      onClick={onClickAction}
    >
      <Icon action={action} />
      <p className="status__action-text">
        {action === "erase"
          ? "Erase"
          : action === "solve"
          ? "Solve"
          : action === "history"
          ? "History"
          : ""}
      </p>
    </div>
  );
};

Icon.propTypes = {
  action: PropTypes.string,
};
Action.propTypes = {
  action: PropTypes.string,
  onClickAction: PropTypes.func,
};
