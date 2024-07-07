import { useRef } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import VideoModalStyle from "./VideoModalStyle";

export default function VideoModal({ info, onClose }) {
  const params = useParams();
  const modalRef = useRef();

  function handleClick (event) {
    if (modalRef.current.className !== event.target.className) {
      onClose();
    }
  }

  return(
      <VideoModalStyle onClick={handleClick}>
        <div ref={modalRef} className="container">
            <iframe
              width = "400px"
              height = "300px"
              src = {`https://www.youtube.com/embed/${params.videoId}`} />
            <div className="title">{info.videoTitle}</div>
            <div className="description">{info.videoDescription.length > 100 ? info.videoDescription.slice(0, 99) + "..." : info.videoDescription}</div>
            <div className="date">{new Date(info.publishedAt).toLocaleDateString('ko-KR', {})}</div>
          <button onClick={onClose}>X</button>
        </div>
      </VideoModalStyle>
  );
}

VideoModal.propTypes = {
  info: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
