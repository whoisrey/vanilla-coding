import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate, formatTime, formatDay, formatSingleDigit } from "../../utils/formatDate";
import { updateTime } from "../../slices/clockSlice";
import { removeAlarm } from "../../slices/alarmSlice";

import AlarmNotice from "../Notice/AlarmNotice";
import ModeChanger from "./ModeChanger";

import CurrentDateAndTimeStyles from "./CurrentDateAndTimeStyles";

const CurrentDateAndTime = () => {
  const now = useSelector((state) => state.clock.currentDate);
  const mode = useSelector((state) => state.clock.mode);
  const alarms = useSelector((state) => state.alarm.dates.byId);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const [alarmMode, setAlarmMode] = useState(null);
  const [currentAlarm, setCurrentAlarm] = useState(null);

  useEffect(() => {
    const tick = setInterval(() => {
      dispatch(updateTime());
    }, 1000);

    return () => clearInterval(tick);
  }, [dispatch]);

  useEffect(() => {
    setIsActive(false);
    setAlarmMode(null);

    const currentTime = formatTime(new Date(now));
    const currentDate = formatDate(new Date(now));

    Object.keys(alarms).forEach((date) => {
      if (date === currentDate.fullDate) {
        alarms[date].alarms.forEach((alarm) => {
          if (alarm.time === currentTime.fullTime) {
            setIsActive(true);
            setAlarmMode(alarm.mode);
            setCurrentAlarm({ date, id: alarm.id });
          }
        });
      }
    });
  }, [now, alarms]);

  const stopAlarm = () => {
    if (currentAlarm) {
      dispatch(removeAlarm(currentAlarm));
      setIsActive(false);
      setCurrentAlarm(null);
    }
  };

  const getAlarmMessage = (isActive, currentAlarm, alarms) => {
    let alarmMessage = "";
    if (isActive && currentAlarm) {
      const { date, id } = currentAlarm;
      alarmMessage = alarms[date].alarms.find((alarm) => alarm.id === id).message;
    }
    return alarmMessage;
  };

  const getModalClass = (mode, alarmMode) => {
    let modalClass = "alarm";
    if (mode === "vibrate") {
      modalClass = "shake";
    } else if (mode === "night") {
      modalClass = (alarmMode === "normal") ? "" : "shake";
    }
    return modalClass;
  };

  const alarmMessage = getAlarmMessage(isActive, currentAlarm, alarms);
  const modalClass = getModalClass(mode, alarmMode);

  return (
    <CurrentDateAndTimeStyles onClick={stopAlarm}>
      <ModeChanger />
      <div>
        <p>
          {formatSingleDigit(formatTime(new Date(now)).hours)}:
          {formatSingleDigit(formatTime(new Date(now)).minutes)}:
          {formatSingleDigit(formatTime(new Date(now)).seconds)}
        </p>
      </div>
      <div className="date">
        <div>
          {formatSingleDigit(formatDate(new Date(now)).year)}/
          {formatSingleDigit(formatDate(new Date(now)).month)}/
          {formatSingleDigit(formatDate(new Date(now)).dates)}
        </div>
        {formatDay(new Date(now))}
      </div>
      {isActive && <AlarmNotice modalClass={modalClass} alarmMessage={alarmMessage}/>}
    </CurrentDateAndTimeStyles>
  );
};

export default CurrentDateAndTime;
