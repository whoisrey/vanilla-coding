import PropTypes from "prop-types";

import "./styles.css";

const BattleCard = ({ avatar, player, follower, following, repos, score, isWinner }) => {
  return (
    <div className={`battle-card ${isWinner ? "winner" : ""}`}>
      {isWinner && (<span className="winner-is">Winner</span>)}
      <img className="avatar" src={avatar} alt={`Avatar for ${player}`} />
      <div className="main-info">
        {player && <h2>{player}</h2>}
      </div>
      <div className="sub-info">
        <span>Followers Count: {follower}</span><br/>
        <span>Following Count: {following}</span><br/>
        <span>Repository Count: {repos}</span><br/>
        <span>Score: {score}</span>
      </div>
    </div>
  );
};

BattleCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  follower: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  repos: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  isWinner: PropTypes.bool.isRequired,
};

export default BattleCard;
