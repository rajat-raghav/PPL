import React from "react";
import PropTypes from "prop-types";

const RightButton = props => {
  const { onButtonClick, buttonIcon, buttonText } = props;
  return (
    <div className="rght_btn" onClick={onButtonClick}>
      <span className="rght_btn_icon">
        <img src={buttonIcon} alt="up" />
      </span>{" "}
      <span className="btn_sep">
        <img src="/images/btn_sep.png" alt="sep" />
      </span>{" "}
      <a>{buttonText}</a>{" "}
    </div>
  );
};

RightButton.propTypes = {
  onButtonClick: PropTypes.func,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string
};

export default RightButton;
