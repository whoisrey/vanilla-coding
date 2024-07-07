import { useState } from "react";

import Popular from "../Popular";
import Battle from "../Battle";
import NavButton from "./NavButton";

import "./styles.css";

const App = () => {
  const [showBattle, setShowBattle] = useState(false);
  const [option, setOption] = useState('All');
  const [users, setUsers] = useState({});

  const handleOptionChange = (value) => {
    setOption(value);
  };

  const handleUserChange = (value) => {
    setUsers(value);
  };

  const toggleView = (showBattle) => {
    setShowBattle(showBattle);
  };

  return (
    <div className="container">
      <div className="flex space-between">
        <NavButton
          text="인기 저장소"
          isActive={!showBattle}
          onClick={() => toggleView(false)}
          testId="btn-popular"
        />
        <NavButton
          text="Github 대결"
          isActive={showBattle}
          onClick={() => toggleView(true)}
          testId="btn-battle"
        />
      </div>
      {showBattle ? (
        <Battle users={users} onClick={(value) => handleUserChange(value)}/>
      ) : (
        <Popular option={option} onClick={(value) => handleOptionChange(value)}/>
      )}
    </div>
  );
};

export default App;
