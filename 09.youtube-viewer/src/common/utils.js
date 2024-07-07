export const YOUTUBE_API_KEY = import.meta.env.VITE_API_KEY;

export async function getVideoList(keyword) {
  const linkA = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${YOUTUBE_API_KEY}`;
  const linkB = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&maxResults=25&key=${YOUTUBE_API_KEY}`;
  const endpoint = keyword === undefined ? linkA : linkB;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("HTTP Error");
  }

  const lists = await response.json();

  return lists;
}
