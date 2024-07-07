import ModalStyles from "./ModalStyles";

const Modal = ({ text, className }) => {
  return (
    <ModalStyles>
      <div className={className}>
        {text}
      </div>
    </ModalStyles>
  );
};

export default Modal;
