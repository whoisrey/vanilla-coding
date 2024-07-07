import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import finder from "../assets/finder.png";

import Button from "../common/ButtonStyle";
import Form from "../common/FormStyle";
import Input from "../common/InputStyle";

export default function SearchInput({ placeholder, openModal, setInfo, setIsBlank }) {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setWord(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    if (word.trim() === "") {
      setIsBlank(true);
      openModal();
    } else {
      setIsBlank(false);
      setInfo(word)
      navigate(`/search/${word}`)
    }
  }

  return (
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          value={word}
          data-test="input-search"
        />
        <Button type="submit">
          <img src={finder} />
        </Button>
      </Form>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
  setIsBlank: PropTypes.func.isRequired,
};
