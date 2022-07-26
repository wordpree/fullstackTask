import * as React from "react";
import * as client from "./uitls";

const initialData = { tasks: [] };
const DataContext = React.createContext(initialData);

function useData() {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be within a DataProvide");
  }
  return context;
}

function dataReducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "GET_ALL_TASK_START":
      return { tasks: [] };
    case "GET_ALL_TASK_SUCCESS":
      return { tasks: action.payload };
    case "GET_ALL_TASK_FAILED":
      return { status: "failed", error: action.payload, tasks: null };
    case "CREATE_TASK_SUCCESS":
      return { tasks: [...state.tasks, { ...action.payload }] };
    case "DELETE_TASK_SUCCESS":
      newState = state.tasks.filter((t) => t._id !== action.payload);
      return { tasks: [...newState] };
    case "UPDATE_TASK_SUCCESS":
      const newTasks = state.tasks.map((t) =>
        t._id === action.payload._id
          ? { ...t, complete: action.payload.complete }
          : t
      );
      return { tasks: [...newTasks] };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function DataProvider({ children }) {
  const [state, dispatch] = React.useReducer(dataReducer, initialData);
  const value = [state, dispatch];
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

async function updateTask(dispatch, id, update) {
  try {
    const updatedTask = await client.updateRemoteTask(id, update);
    dispatch({ type: "UPDATE_TASK_SUCCESS", payload: updatedTask });
  } catch (error) {
    dispatch({ type: "UPDATE_TASK_FAILED", payload: error });
  }
}

async function getAllTask(dispatch) {
  dispatch({ type: "GET_ALL_TASK_START", payload: [] });
  try {
    const allTask = await client.getAllRemoteTask();
    dispatch({ type: "GET_ALL_TASK_SUCCESS", payload: allTask });
  } catch (error) {
    dispatch({ type: "GET_ALL_TASK_FAILED", payload: error });
  }
}

async function createTask(dispatch, task) {
  try {
    const newTask = await client.createRemoteTask(task);
    dispatch({ type: "CREATE_TASK_SUCCESS", payload: newTask });
  } catch (error) {
    dispatch({ type: "CREATE_TASK_FAILED", payload: error });
  }
}

async function deleteTask(dispatch, id) {
  try {
    await client.deleteRemoteTask(id);
    dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_TASK_FAILED", payload: error });
  }
}

export {
  useData,
  DataProvider,
  updateTask,
  getAllTask,
  createTask,
  deleteTask,
};
