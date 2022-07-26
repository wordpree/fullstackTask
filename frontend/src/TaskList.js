import React from "react";
import { FormGroup, FormControlLabel, Switch, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  margin: 1rem auto;
  max-width: 860px;
  align-items: center;
  border: 1px solid #fdfdfd;
  padding: 1rem;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
`;

const Span = styled.span`
  margin-right: 3rem;
`;

const CustomizedIconButton = styled(IconButton)`
  margin-left: auto !important;
`;
const TaskList = ({ data, handleDelete, handleUpdate, markComplete }) => {
  const { task, _id, complete } = data;
  const [checked, setChecked] = React.useState(complete);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    handleUpdate(_id, e.target.checked);
  };
  return (
    <Div>
      <div>
        <Span>{task}</Span>
      </div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              disabled={checked}
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "task-status" }}
            />
          }
          label={checked ? "Completed" : "Processing"}
        />
      </FormGroup>
      <CustomizedIconButton
        aria-label="delete"
        size="small"
        onClick={() => handleDelete(_id)}
      >
        <DeleteIcon fontSize="inherit" />
      </CustomizedIconButton>
    </Div>
  );
};

export default TaskList;
