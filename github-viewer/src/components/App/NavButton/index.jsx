import PropTypes from "prop-types";

import "./styles.css";

const NavButton = ({ text, isActive, onClick, testId }) => {
  return (
    <button
      className={`nav-button ${isActive ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      data-test={testId}
    >
      {text}
    </button>
  );
};

export default NavButton;

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
};
