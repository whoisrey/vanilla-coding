import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./header/Header";
import VideoList from "./video-list/VideoList";
import VideoModal from "./modal/VideoModal";
import ErrorModal from "./modal/ErrorModal";

import Container from "./common/ContainerStyle";
import Main from "./common/MainStyle"

export default function App() {
  const [info, setInfo] = useState({});
  const [isBlank, setIsBlank] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isOpen = new URLSearchParams(location.search).get("modal") === "true";

  function openModal() {
    navigate('?modal=true');
  }

  function closeModal() {
    navigate(-1);
  }

  useEffect(() => {
    const link = document.createElement('link');

    link.href = 'https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Header openModal={openModal} setInfo={setInfo} setIsBlank={setIsBlank} />
      <Main>
        <Container>
          <Routes>
            <Route path="/" exact element={<VideoList setInfo={setInfo} />} />
            <Route path="/search/:keyword" element={<VideoList setInfo={setInfo} />} />
            <Route
              path="/modal/:videoId"
              element={
                <VideoModal
                  info={info}
                  isOpen={isOpen}
                  onClose={closeModal} />}
            />
            <Route
              path="/search/:keyword/modal/:videoId"
              element={
                <VideoModal
                  info={info}
                  isOpen={isOpen}
                  onClose={closeModal} />}
            />
          </Routes>
          {isOpen && (<ErrorModal
            isOpen={isOpen}
            onClose={closeModal}
            errorMessage={isBlank ? "검색어를 입력하시오" : "에러"} />)}
        </Container>
      </Main>
    </>
  );
}
