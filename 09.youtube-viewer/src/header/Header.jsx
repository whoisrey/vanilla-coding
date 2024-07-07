import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import logo from "../assets/youtube.png";
import premium from "../assets/premium.png";

import Container from "../common/ContainerStyle";
import HeaderStyle from "./HeaderStyle";
import SearchInput from "./SearchInput";

export default function Header({ openModal, setInfo, setIsBlank }) {

  return (
    <HeaderStyle>
      <Container>
        <section>
          <Link to="/">
            <div className="brand">
              <img src={logo} alt="logo" />
              <img src={premium} alt="premium" />
            </div>
          </Link>
          <div className="input-container">
            <SearchInput
              placeholder="검색"
              openModal={openModal}
              setInfo={setInfo}
              setIsBlank={setIsBlank}
            />
          </div>
        </section>
      </Container>
    </HeaderStyle>
  );
}

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
  setIsBlank: PropTypes.func.isRequired,
};
