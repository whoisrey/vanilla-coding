import styled from "styled-components";

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 40px;
    gap: 8px;
    position: relative;
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 0 10px #ccc;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 6px;
  }

  .description {
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
  }

  .date {
    color: #aeacac;
    font-size: 10px;
    font-style: italic;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    color: #000;
    box-shadow: 0 0 10px #ededed;
    border: 1px solid #cccccc;
    background: #EFEFEF;
    border-radius: 5px;
  }

  button:hover {
    border: 1px solid #414141;
    transition: all 1s;
  }
`
