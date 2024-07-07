import PropTypes from "prop-types";

import { applyInputStyle } from "../../utils/common/applyStyle";

function Input({ id, value, name = "", type = "text", min = "", max = "", maxLength, onChange }) {
  const keyword = name.split("_")[0];

  return (
    <label htmlFor={id}>
        <input
          className={applyInputStyle(keyword)}
          id={id}
          value={value}
          name={name}
          type={type}
          min={min}
          max={max}
          maxLength={maxLength}
          onChange={onChange}
          autoComplete="off"
        />
    </label>
  )
}

export default Input;

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
