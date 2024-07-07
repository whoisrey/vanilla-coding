import { Link } from "react-router-dom";

import logo from "../../assets/logos/react.png"

import HeaderStyles from "./HeaderStyles";

const Header = () => {
  return (
    <HeaderStyles>
      <nav>
        <ul>
          <li>
            <img src={logo} />
          </li>
          <li>
            <p>RE</p>act <p>AL</p>arm
          </li>
        </ul>
      </nav>
    </HeaderStyles>
  );
};

export default Header;
