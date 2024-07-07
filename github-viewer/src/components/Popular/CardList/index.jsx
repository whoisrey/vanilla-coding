import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getPopularRepos } from "../../../utils/api";

import Loading from "../../Splash/Loading";
import Error from "../../Splash/Error"
import Card from "./Card";

import "./styles.css";

const CardList = ({ language }) => {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setIsError(false);

    getPopularRepos(language).then((result) => {
      if (!ignore) {
        setInfo(result);
        setIsLoading(false);
      }
    }).catch((error) => {
      if (!ignore) {
        console.error(`We can't fetch data`, error);
        setIsLoading(false);
        setIsError(true);
      }
    });

    return () => {
      ignore = true;
    };
  }, [language]);

  if (isLoading) {
    return <Loading text="로딩중" testId="ui-loading"/>;
  }

  if (isError) {
    return <Error text="에러" testId="error-message-popular"/>;
  }

  return (
    <div className="card-list">
      {info && info.map(({id, owner, name, stargazers_count, forks, open_issues, html_url}) => (
        <Card
          key={id}
          header={owner.login}
          subheader={name}
          stars={stargazers_count.toLocaleString()}
          forks={forks.toLocaleString()}
          issues={open_issues.toLocaleString()}
          avatar={owner.avatar_url}
          href={html_url}
          name={owner.login}/>
      ))}
    </div>
  );
};

CardList.propTypes = {
  language: PropTypes.string.isRequired,
};

export default CardList;
