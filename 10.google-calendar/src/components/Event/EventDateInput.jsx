import PropTypes from "prop-types";

import Input from "../common/Input";

function EventDateInput({ id, type, name, value, onChange }) {
  return (
    <div className="relative flex flex-col items-end">
      <p className="absolute -top-3.5 right-[6rem] text-xs text-black font-bold uppercase">{id}</p>
      <Input id={id} value={value} onChange={onChange} type={type} name={name} />
    </div>
  );
}

export default EventDateInput;

EventDateInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
