import { Link, Outlet } from "react-router-dom";

import CurrentDateAndTime from "./CurrentDateAndTime";
import AlarmList from "./AlarmList";

import ClockStyles from "./ClockStyles";

const Clock = () => {
  return (
    <ClockStyles>
      <Link className="link" to="/settings">Alarm+</Link>
      <CurrentDateAndTime />
      <AlarmList />
      <Outlet />
    </ClockStyles>
  );
};

export default Clock;
