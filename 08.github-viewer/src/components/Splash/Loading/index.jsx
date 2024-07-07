import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Loading = ({ text, speed, testId }) => {
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

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};

export default Loading;
