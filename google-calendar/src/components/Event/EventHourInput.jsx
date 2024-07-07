import PropTypes from "prop-types";

import Input from "../common/Input";

function EventHourInput({ id, type, name, value, onChange }) {
  const paddedValue = value.padStart(2, "0");

  return (
    <div>
      <p className="text-xs text-black font-bold uppercase">
        {id === "startedAt" ? "start" : "end"}
      </p>
      <Input id={id} value={paddedValue} onChange={onChange} type={type} name={name} maxLength=""/>
    </div>
  );
}

export default EventHourInput;

EventHourInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
