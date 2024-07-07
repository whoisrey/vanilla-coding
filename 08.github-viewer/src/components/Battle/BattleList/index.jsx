import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getUserData } from "../../../utils/api";

import Loading from "../../Splash/Loading";
import Error from "../../Splash/Error";
import BattleCard from "./BattleCard";

import "./styles.css";

const BattleList = ({ fight, setIsReady, inputValue }) => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

  if (inputValue[0] && inputValue[1]) {
    try {
      Promise.all(inputValue.map((username) => getUserData(username))).then((result) => {
        if (!ignore) {
          setProfiles(result);
          setIsLoading(false);
          setIsError(false);
        }
      })
    } catch (error) {
      if (!ignore) {
        setIsLoading(false);
        setIsReady(false);
        setIsError(true);
      }
    }
  }

    return () => {
      ignore = true;
    };
  }, [fight, setIsReady, inputValue]);

  if (isLoading) {
    return <Loading text="로딩중" testId="ui-isLoading"/>;
  }

  if (!isLoading && isError) {
    return <Error text="입력오류" testId="error-message-popular"/>;
  }

  const winnerScore = Math.max(...profiles.map((profile) => profile.score));

  return (
    <div className="card-container">
      {fight && profiles.map((profile) => (
        <BattleCard
          key={profile.profile.id}
          avatar={profile.profile.avatar_url}
          player={profile.profile.login}
          follower={profile.profile.followers.toLocaleString()}
          following={profile.profile.following.toLocaleString()}
          repos={profile.profile.public_repos.toLocaleString()}
          score={profile.score.toLocaleString()}
          isWinner={profile.score === winnerScore}
        />
      ))}
    </div>
  );
};

BattleList.propTypes = {
  fight: PropTypes.bool.isRequired,
  setIsReady: PropTypes.func.isRequired,
  inputValue: PropTypes.array.isRequired,
};

export default BattleList;
