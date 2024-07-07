import InputStyles from "./InputStyles";

const Input = ({ id, type, onChange }) => {
  return (
    <InputStyles>
      <label htmlFor={id}>
        <input id={id} type={type} onChange={onChange} autoComplete="off" />
      </label>
    </InputStyles>
  );
};

export default Input;
