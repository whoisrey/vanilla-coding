import { useState } from "react";
import PropTypes from "prop-types";

import LANGUAGES from "../../constants/languages";

import LangButton from "./LangButton";
import CardList from "./CardList";

import "./styles.css";

const Popular = ({ option, onClick }) => {
  const [language, setLanguage] = useState(option);

  const handleLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    onClick(selectedLanguage);
  };

  return (
    <>
      <div className="language-button-container">
        {LANGUAGES.map((lang) => (
          <LangButton
            key={lang.en}
            value={lang.en}
            isSelected={language === lang.en}
            onClick={handleLanguage}
            testId={`btn-language-${lang.en}`} />
        ))}
      </div>
      <CardList language={language}/>
    </>
  );
};

Popular.propTypes = {
  option: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Popular;
