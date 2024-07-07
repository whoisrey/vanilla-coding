import PROFILE from "./profile.json";
import PERSONAL_REPOS from "./personalRepositories.json";
import POPULAR_REPOS from "./popularRepositories.json";

/*

  TODO: Enter your own Github client id and secret id below

  1. Visit Github.com
  2. Visit User Settings (https://github.com/settings/profile)
  3. Select "Developer Settings"
  4. Select "Oauth Apps"
  5. Select "New Oauth App"
  6. Enter "http://localhost:5173" for homepage & callback URL
  7. Enter your Client ID and Secret ID below

 */
const GITHUB_CLIENT_ID = "GITHUB_CLIENT_ID";
const GITHUB_SECRET_ID = "GITHUB_SECRET_ID";

const defaultParams = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET_ID}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `"${username}"는 존재하지 않는 사용자입니다`;
  }

  return message;
}

async function getProfile(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}${defaultParams}`
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(getErrorMsg(errorData.message, username));
    }

    const profile = await response.json();

    return profile;
  } catch (error) {
    console.error(`Failed to fetch profile for user ${username}:`, error);

    throw error;
  }
}

async function getRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos${defaultParams}&per_page=100`
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(getErrorMsg(errorData.message, username));
    }

    const repos = await response.json();

    return repos;
  } catch (error) {
    console.error(`Failed to fetch repository for user ${username}:`, error);

    throw error;
  }
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

export async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ])
    .then((result) => result)
    .catch((error) => error);

  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle([player1, player2]) {
  const [playerOne, playerTwo] = await Promise.all([
    getUserData(player1),
    getUserData(player2),
  ])
    .then((result) => result)
    .catch((error) => error);
  return sortPlayers([playerOne, playerTwo]);
}

export async function getPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories${defaultParams}&q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const res = await fetch(endpoint);
  const { items } = await res.json();

  return items;
}
