import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addAlarm } from "../../slices/alarmSlice";
import { formatDate, formatTime } from "../../utils/formatDate";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

import AlarmDateSettingsStyles from "./AlarmDateSettingsStyles";

const AlarmDateSettings = ({ closeModal }) => {
  const [alarmDetail, setAlarmDetail] = useState({
    mode: "normal",
    date: "",
    time: "",
    message: "",
  });

  const now = useSelector((state) => state.clock.currentDate);
  const alarms = useSelector((state) => state.alarm.dates.byId);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentDate = new Date(now);
  const fullDate = formatDate(currentDate).fullDate;
  const fullTime = formatTime(currentDate).fullTime;

  const alarmOptions = [
    { value: "normal", name: "일반" },
    { value: "emergency", name: "긴급" },
  ];

  const updateDetails = (event) => {
    const {id, value} = event.target;

    if (id === "date" && value < fullDate) {
      alert("이전 날짜는 입력이 안됩니다.");
      return;
    }

    if (id === "message" && value.length > 15) {
      alert("메시지는 15자 이내로 입력해 주세요.");
      return;
    }

    setAlarmDetail((prevDetail) => ({
      ...prevDetail,
      [id]: value,
    }));
  };

  const updateAlarm = (event) => {
    event.preventDefault();
    const {date, time} = alarmDetail;
    const targetDate = Object.keys(alarms).filter((alarmDate) => alarmDate === date)[0];

    if (fullDate === date && time <= fullTime) {
      alert("현재 시간 이전 시간은 입력할 수 없습니다.");
      return;
    }

    if (targetDate) {
      const targetAlarm = alarms[targetDate].alarms;
      const isDuplicate = targetAlarm.some((alarm) => {
        return alarm.time === time;
      });

      if (isDuplicate) {
        alert("중복되는 날짜는 입력할 수 없습니다.")
        return;
      }
    }

    dispatch(addAlarm(alarmDetail));
    navigate("/");
  };

  return (
    <AlarmDateSettingsStyles>
      <button className="close-btn" onClick={closeModal}>X</button>
      <form onSubmit={updateAlarm} onClick={(e) => e.stopPropagation()}>
        <Select id="mode" options={alarmOptions} onChange={updateDetails} value={alarmDetail.mode} />
        <Input id="date" type="date" onChange={updateDetails} />
        <Input id="time" type="time" onChange={updateDetails} value={alarmDetail.time} />
        <Input id="message" type="text" onChange={updateDetails} />
        <Button type="submit" text="SAVE" />
      </form>
    </AlarmDateSettingsStyles>
  );
};

export default AlarmDateSettings;
