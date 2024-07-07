import styled from "styled-components";

export default styled.input`
  padding: 10px 15px;
  border: 1px solid #cccccc;
  height: 24px;
  min-width: 200px;
  width: calc(100% - 32px);
  border-radius: 40px 0 0 40px;
  font-size: 16px;
  font-family: inherit;
  letter-spacing: -0.5px;
  transition: 0.3s all ease;
  box-shadow: 0 0 10px #ededed;

  &:hover,
  &:focus,
  &:active {
    border: 1px solid #414141;
  }
`;
