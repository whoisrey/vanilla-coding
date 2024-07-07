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

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 3rem;
    padding-bottom: 2rem;
    font-size: 4rem;
    box-shadow: 0 0 10px #202231;
    border-radius: 1rem;
    background-color: #097A9E;
    color: #000;
    width: 33rem;
    height: 15rem;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  .shake {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }

  .shake:hover {
    background-color: red;
    transition: all 2s;
  }

  @keyframes alarm {
    0% {
      filter: brightness(100%);
      transform: scale(1);
    }
    50% {
      filter: brightness(130%);
      transform: scale(1.1);
    }
    100% {
      filter: brightness(100%);
      transform: scale(1);
    }
  }

  .alarm {
    animation: alarm 1s ease-in-out infinite;
  }

  .alarm:hover {
    background-color: #fff;
    transition: all 2s;
  }
`
