import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { removeAlarm } from "../../slices/alarmSlice";

import Button from "../common/Button";

import AlarmListStyles from "./AlarmListStyles";

const AlarmList = () => {
  const alarmDates = useSelector((state) => state.alarm.dates);
  const dispatch = useDispatch();

  const updateAlarmList = (alarm) => {
    dispatch(removeAlarm(alarm));
  };

  return (
    <AlarmListStyles>
      <ul>
        {alarmDates.allIds.map((date) => (
          alarmDates.byId[date].alarms.map((alarm, index) => (
            <div key={index}>
              <span>{index + 1}.</span>
              <li key={index}>
                <p>Mode: {alarm.mode}</p>
                <p>Date: {date}</p>
                <span>Time: {alarm.time}</span>
                <p>Message: {alarm.message}</p>
                <Button text="DEL" onClick={() => updateAlarmList(alarm)} />
              </li>
            </div>
          ))
        ))}
      </ul>
      <Outlet />
    </AlarmListStyles>
  );
};

export default AlarmList;
