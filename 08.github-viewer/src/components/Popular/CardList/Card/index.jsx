import PropTypes from "prop-types";

import "./styles.css";

const Card = ({
  header,
  subheader,
  stars,
  forks,
  issues,
  avatar,
  href,
  name
}) => {
  return (
    <div className="card">
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      <div className="main-info">
        {subheader && <h2>{header}</h2>}
        Move to Repo 👇🏽 <br/>
        <a className="link" href={href}>
          {subheader}
        </a>
      </div>
      <div className="sub-info">
        <span data-test="list-stars-0">Star Count: {stars}</span><br/>
        <span data-test="list-forks-0">Fork Count: {forks}</span><br/>
        <span data-test="list-issues-0">Issue Conut: {issues}</span><br/>
      </div>
    </div>
  );
};

Card.propTypes = {
  header: PropTypes.string.isRequired,
  stars: PropTypes.string.isRequired,
  forks: PropTypes.string.isRequired,
  issues: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
