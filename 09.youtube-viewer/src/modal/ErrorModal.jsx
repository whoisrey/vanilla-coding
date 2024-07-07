import { useRef } from "react";

import PropTypes from "prop-types";

import ErrorModalStyle from "./ErrorModalStyle"

export default function ErrorModal({ isOpen, onClose, errorMessage }) {
  const modalRef = useRef();

  function handleClick (event) {
    if (modalRef.current.className !== event.target.className) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return(
    <ErrorModalStyle onClick={handleClick}>
      <div ref={modalRef} className="content">
        {errorMessage}
        <button onClick={onClose}>X</button>
      </div>
    </ErrorModalStyle>
  );
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
