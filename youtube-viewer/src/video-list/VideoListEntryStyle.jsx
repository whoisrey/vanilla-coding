import styled from "styled-components";

export default styled.div`
  width: 100%;
  color: #5d5c5c;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: auto;

  img {
    flex-grow: 1;
    width: 100%;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  }

  .contents {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: space-between;
    padding: 0 2px;
  }

  .title {
    font-size: 11px;
    font-weight: bold;
    margin-top: 6px;
  }

  .description {
    font-size: 8px;
    border-bottom: 3px solid #ccc;
    padding-bottom: 8px;
  }

  .date {
    color: #aeacac;
    font-size: 10px;
    font-style: italic;
  }
`;
