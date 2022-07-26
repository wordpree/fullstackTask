import React, { useEffect } from "react";
import { CssBaseline, Button, Fab } from "@mui/material";
import {
  useData,
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
} from "./context";
import TaskList from "./TaskList";
import InputBackdrop from "./Backdrop";
import BackdropContent from "./BackdropContent";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomizedBtn = styled(Button)`
  display: flex;
  margin: 2.75rem auto 1rem;
`;

const FloadBtn = styled(Fab)`
  position: fixed;
  left: 15vw;
  top: 25vh;
`;

function App() {
  const [state, dispatch] = useData();
  console.log(state);
  const [open, setOpen] = React.useState(false);
  const [markComplete, setMarkComplete] = React.useState(false);
  useEffect(() => {
    console.log("use effect...");
    async function fetchData() {
      try {
        await getAllTask(dispatch);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch]);
  const handleBackdrop = React.useCallback((open) => setOpen(open), []);
  const handleCreateTask = React.useCallback(
    (input) => createTask(dispatch, { task: input }),
    [dispatch]
  );
  const handleTaskDelete = React.useCallback(
    (id) => deleteTask(dispatch, id),
    [dispatch]
  );
  const handleTaskUpdate = React.useCallback(
    (id, checked) => updateTask(dispatch, id, { complete: checked }),
    [dispatch]
  );
  const handleMarkComplete = () => {
    setMarkComplete(true);
  };
  return (
    <>
      <CssBaseline />
      <FloadBtn
        color="primary"
        aria-label="confirm"
        variant="extended"
        onClick={handleMarkComplete}
      >
        <CheckCircleIcon sx={{ mr: 2 }} />
        Mark Completed
      </FloadBtn>
      {state.tasks &&
        state.tasks.map((t) => (
          <TaskList
            key={t._id}
            data={t}
            handleDelete={handleTaskDelete}
            handleUpdate={handleTaskUpdate}
            markComplete={markComplete}
          />
        ))}
      <CustomizedBtn variant="contained" onClick={() => handleBackdrop(true)}>
        Create Task
      </CustomizedBtn>
      <InputBackdrop open={open} handleBackdrop={handleBackdrop}>
        <BackdropContent
          handleBackdrop={handleBackdrop}
          handleCreateTask={handleCreateTask}
        />
      </InputBackdrop>
    </>
  );
}

export default App;
