import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Alarm from "../../assets/sounds/alarm.mp3"

import Modal from "../common/Modal";

import AlarmNoticeStyles from "./AlarmNoticeStyles";

const AlarmNotice = ({ modalClass, alarmMessage }) => {
  const navigate = useNavigate();
  const audio = new Audio(Alarm);

  const closeModal = () => {
    navigate("/");
  };

  useEffect(() => {
    if (modalClass === "alarm") {
      audio.play();
    }
  }, [modalClass]);

  return (
    <AlarmNoticeStyles onClick={closeModal}>
      <Modal className={modalClass} text={alarmMessage} />
    </AlarmNoticeStyles>
  );
};

export default AlarmNotice;
