import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

  * {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: #202231;
    color: #097A9E;
  }
`;

export default GlobalStyles;
