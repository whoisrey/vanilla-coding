import ButtonStyles from "./ButtonStyles";

const Button = ({ type, text, onClick }) => {
  return (
    <ButtonStyles>
      <button type={type} onClick={onClick}>{text}</button>
    </ButtonStyles>
  );
};

export default Button;
