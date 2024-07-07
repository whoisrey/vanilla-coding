import styled from "styled-components";

export default styled.header`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  top: 0;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  .brand {
    display: flex;
    align-items: center;
  }

  img {
    height: 50px;
  }

  .input-container {
    width: 300px;
    display: flex;
  }
`;
