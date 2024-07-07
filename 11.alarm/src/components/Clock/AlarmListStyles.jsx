import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  gap: 2rem;
  border-top: 2px solid #097A9E;

  div {
    display: flex;
    align-items: center;
    span {
      margin-right: 1rem;
      color: #61D9FB;
    }
  }

  ul {
    font-family: "Jua", sans-serif;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      margin: 1rem;
    }
  }
`
