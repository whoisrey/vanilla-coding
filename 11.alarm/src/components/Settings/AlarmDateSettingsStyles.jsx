import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2rem;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 3rem;
    padding-bottom: 2rem;
    box-shadow: 0 0 10px #202231;
    border-radius: 1rem;
    background-color: #097A9E;
  }

  select {
    font-size: 1.5rem;
    color: #000;
    background-color: #097A9E;
  }

  input {
    background-color: #097A9E;;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    background-color: #202231;
  }
`
