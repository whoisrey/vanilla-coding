import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import ContainerStyle from "../common/ContainerStyle";
import VideoListEntryStyle from "./VideoListEntryStyle";

export default function VideoListEntry({ videoId, videoThumbnail, videoTitle, videoDescription = "", publishedAt, setInfo }) {
  const navigate = useNavigate();

  const data = {
    videoTitle: videoTitle,
    publishedAt: publishedAt,
    videoDescription: videoDescription,
  };

  function handleClick(id) {
    navigate(`modal/${id}`);
  }

  return (
    <VideoListEntryStyle data-test={`video-item-${videoId}`}>
      <ContainerStyle onClick={() => {
        handleClick(videoId);
        setInfo(data);
        }}>
          <img
            src={videoThumbnail}
            alt={videoTitle}
            data-test="video-thumbnail"
          />
        <div className="contents">
          <div className="title" data-test="video-title">{videoTitle}</div>
          <div className="description" data-test="video-description">{videoDescription.length > 30 ? videoDescription.slice(0, 30) + '...' : videoDescription}</div>
          <div className="date">{new Date(publishedAt).toLocaleDateString('ko-KR', {})}</div>
        </div>
      </ContainerStyle>
    </VideoListEntryStyle>
  );
}

VideoListEntry.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoThumbnail: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoDescription: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  setInfo: PropTypes.func.isRequired,
};
