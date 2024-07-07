import { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import { getVideoList } from "../common/utils";

import VideoListStyle from "./VideoListStyle";
import VideoListEntry from "./VideoListEntry";

export default function VideoList({ setInfo }) {
  const [lists, setLists] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get("q");
  const params = useParams();

  useEffect(() => {
    if (!params.keyword) {
      async function getVideoListAsync() {
        const result = await getVideoList();

        setLists(result.items);
      }

      getVideoListAsync();
    } else {
      async function getVideoListAsync(keyword) {
        const result = await getVideoList(keyword);

        setLists(result.items);
      }

      getVideoListAsync(params.keyword);
    }
  }, [params.keyword]);

  return (
    <VideoListStyle data-test="video-list">
      {lists && lists.map(({ id, etag, snippet }) => (
        <VideoListEntry
          key={etag}
          videoId={word ? id.videoId : id}
          videoThumbnail={snippet.thumbnails.high.url}
          videoTitle={snippet.title}
          videoDescription={snippet.description}
          publishedAt={snippet.publishedAt}
          setInfo={setInfo}
        />
      ))}
    </VideoListStyle>
  );
}

VideoList.propTypes = {
  setInfo: PropTypes.func.isRequired,
};
