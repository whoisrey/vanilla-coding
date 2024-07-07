import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import UserInput from "./UserInput";
import BattleList from "./BattleList";

import "./styles.css";

const Battle = ({ users, onClick }) => {
  const [players, setPlayers] = useState(users);
  const [isSubmitted, setIsSubmitted] = useState({playerOne: false, playerTwo: false});
  const [isReady, setIsReady] = useState(false);

  const handlePlayerSubmit = (player, value) => {
    setPlayers((prevPlayer) => ({
      ...prevPlayer,
      [player]: value,
    }));

    setIsSubmitted((prevSubmitted) => ({
      ...prevSubmitted,
      [player]: true,
    }));
  };

  const isPlayerDisabled = (player) => {
    return isSubmitted[player] && !isSubmitted[player === "playerOne" ? "playerTwo" : "playerOne"]
  };

  const handleFight = () => {
    if (users.playerOne && users.playerTwo) {
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (isSubmitted.playerOne && isSubmitted.playerTwo) {
      onClick(players);
    }
  }, [isSubmitted, players, onClick]);

  return (
    <div data-test="ui-battle">
      <div className="input-container">
        <UserInput
          player="player 1"
          onSubmit={(value) => handlePlayerSubmit('playerOne', value)}
          disabled={isPlayerDisabled('playerOne')}/>
        <button value="fight" className="battle-button" onClick={handleFight}>대결</button>
        <UserInput
          player="player 2"
          onSubmit={(value) => handlePlayerSubmit("playerTwo", value)}
          disabled={isPlayerDisabled("playerTwo")}/>
      </div>
      <div className="battle-manual">
        사용자의 사생활을 위해 <br/>
        <b className="bold">대결</b> 버튼을 눌러야 대결 결과를 보여드립니다.
      </div>
      <BattleList fight={isReady} setIsReady={setIsReady} inputValue={[players.playerOne, players.playerTwo]}/>
    </div>
  );
};

Battle.propTypes = {
  users: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Battle;
