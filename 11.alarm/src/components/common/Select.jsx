import SelectStyles from "./SelectStyles";

const Select = ({ id, options, onChange }) => {
  return (
    <SelectStyles>
      <label htmlFor={id}>
        <select id={id} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.name}</option>
          ))}
        </select>
      </label>
    </SelectStyles>
  );
};

export default Select;
