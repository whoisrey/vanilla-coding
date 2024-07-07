import { useNavigate } from "react-router-dom";

import AlarmDateSettings from "./AlarmDateSettings";

import AlarmStyles from "./AlarmSettingsStyles";

const AlarmSettings = () => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate('/');
  };

  return (
    <AlarmStyles onClick={closeModal}>
      <AlarmDateSettings closeModal={closeModal}/>
    </AlarmStyles>
  );
};

export default AlarmSettings;
