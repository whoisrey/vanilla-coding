import PropTypes from "prop-types";

import { applyButtonStyle } from "../../utils/common/applyStyle";

function Button({ name = "", type, text, action }) {
  const keyword = name.split("_")[0];

  return (
    <button
      name={name}
      type={type}
      text={text}
      onClick={action}
      className={applyButtonStyle(keyword)}>
      {text}
    </button>
  )
}

export default Button;

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
