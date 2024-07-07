import styled from "styled-components";

export default styled.header`
  display: flex;
  justify-content: space-between;
  font-family: "Jua", sans-serif;
  font-size: 2rem;

  nav {
    ul {
      display: flex;
      align-items: center;
    }

    li {
      display: flex;

      p {
        color: #61D9FB;
      }
    }
  }

  img {
    width: 5rem;
    padding: 1rem;
  }
`
