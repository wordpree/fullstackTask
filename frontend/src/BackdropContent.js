import React from "react";
import styled from "styled-components";
import { Button, Input } from "@mui/material";

const Div = styled.div`
  background-color: #fdfdfd;
  color: #444;
  border: 1px solid #eee;
  width: 100%;
  max-width: 548px;
  padding: 2rem 3rem;
  border-radius: 8px;
`;
const BtnDiv = styled.div`
  display: flex;
  margin-top: 4rem;
  padding-top: 2rem;
  justify-content: space-between;
`;
const BackdropContent = ({ handleBackdrop, handleCreateTask }) => {
  const [input, setInput] = React.useState("");
  const textInput = React.useRef(null);
  const handleTaskCreate = () => {
    if (input.trim() === "") {
      textInput.current.focus();
    } else {
      handleCreateTask(input);
      handleBackdrop(false);
      setInput("");
    }
  };
  const handleInput = (e) => {
    setInput(e.currentTarget.value);
  };
  return (
    <Div>
      <Input
        placeholder="task..."
        inputProps={{ "aria-label": "task" }}
        onChange={handleInput}
        value={input}
        ref={textInput}
      />
      <BtnDiv>
        <Button onClick={handleTaskCreate} variant="contained">
          OK
        </Button>
        <Button onClick={() => handleBackdrop(false)} variant="contained">
          Cancel
        </Button>
      </BtnDiv>
    </Div>
  );
};

export default BackdropContent;
