import PropTypes from "prop-types";

import "./styles.css";

const LangButton =({ value, isSelected, onClick, testId }) => {
  const imageFiles = {
    "All": "vaco-logo.png",
    "JavaScript": "javascript.png",
    "Ruby": "ruby.png",
    "Java": "java.png",
    "Kotlin": "kotlin.png",
    "Go": "go.png",
    "CSS": "css.png",
    "Python": "python.png",
  };

  const imageSrc = `src/assets/icons/${imageFiles[value]}`;

  return (
    <div data-test="nav-languages">
      <button
        value={value}
        className={`lang-button ${isSelected ? "selected" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        data-test={testId}
        style={{backgroundImage: `url(${imageSrc})`}}
      />
    </div>
  );
};

LangButton.propTypes = {
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default LangButton;
