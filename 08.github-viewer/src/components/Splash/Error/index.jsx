import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Error = ({ text, speed, testId }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setContent((content) => (content === text + '...' ? text : content + '.'));
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="content" data-test={testId}>
      {content}
    </p>
  );
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};

Error.defaultProps = {
  text: "Error",
  speed: 300,
};

export default Error;
