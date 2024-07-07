import styled from "styled-components";

export default styled.button`
  position: relative;
  border: 1px solid #cccccc;
  width: 50px;
  border-radius: 0 40px 40px 0;
  font-family: inherit;
  transition: 0.3s all ease;
  box-shadow: 0 0 10px #ededed;
  cursor: pointer;

  img {
    height: 16px !important;
    width: 16px !important;
    position: absolute;
    top: 32%;
    left: 25%;
  }

  &:hover {
    border: 1px solid #414141;
  }
`;
