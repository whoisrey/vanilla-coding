import PropTypes from "prop-types";

import Input from "../common/Input";

function EventTextInput({ id, name, value, maxLength, onChange }) {
  return (
    <div>
      <p className="text-base text-black font-bold uppercase">{id}</p>
      <p className="text-xs text-slate-600">{maxLength}자 이내</p>
      <Input id={id} value={value} onChange={onChange} name={name} maxLength={maxLength}/>
    </div>
  );
}

export default EventTextInput;

EventTextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
