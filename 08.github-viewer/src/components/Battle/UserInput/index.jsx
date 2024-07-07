import { useState } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const UserInput = ({ player, onSubmit, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form className="user-form" onSubmit={handleFormSubmit}>
      <label className="user-label" htmlFor="userInput">{player}: </label>
      <input
        className="user-input"
        name="player"
        id="userInput"
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        />
    </form>
  );
};

UserInput.propTypes = {
  player: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default UserInput;
