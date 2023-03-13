import React from "react";
import PropTypes from "prop-types";

export const Message = ({ message }) => {
  return (
    <div>
      <h3 className="message__text">
        <span>{message}</span>
      </h3>
    </div>
  );
};
Message.propTypes = {
  message: PropTypes.string,
};
