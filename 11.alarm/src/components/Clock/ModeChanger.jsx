import { useDispatch, useSelector } from "react-redux";

import { setClockMode } from "../../slices/clockSlice";

import Select from "../common/Select";

const ModeChanger = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.clock.mode);

  const modeOptions = [
    { value: "normal", name: "normal" },
    { value: "vibrate", name: "vibrate" },
    { value: "night", name: "night" },
  ];

  const handleModeChange = (event) => {
    dispatch(setClockMode(event.target.value));
  };

  return (
    <Select options={modeOptions} value={currentMode} onChange={handleModeChange}/>
  );
};

export default ModeChanger;
